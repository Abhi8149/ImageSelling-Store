import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbconnect } from "@/lib/dbconnect";
import Razorpay from "razorpay";
import Order from "@/models/Orders";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
export async function POST(request:NextRequest){
  const session=await getServerSession(authOptions)
  if(!session){
    return NextResponse.json({error:"Unauthorized"},{status:401})
  }
  try {
    await dbconnect()
    const {productId, varient}=await request.json();
    if(!productId || !varient){
      return NextResponse.json({error:"Missing required fields"},{status:400})
    }
  
    //create razorpay order
    const order = await razorpay.orders.create({
      amount:varient.price*100,
      currency:"INR",
      receipt:`receipt_${Date.now()}`,
      notes:{
          productId:productId.toString()
      }
    })
  
    const newOrder=await Order.create({
      userId:session.user.id,
      productId:productId,
      varient,
      razorpayOrderId:order.id,
      amount:varient.price,
      status:"PENDING"
    })
  
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: newOrder._id,
    });
  } catch (error) {
     console.log('Failed to create order',error)
     return NextResponse.json({error:"Failed to create order"},{status:500})
  }


}