import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { dbconnect } from "@/lib/dbconnect";
import Order from "@/models/Orders";

export async function GET(request:NextRequest){
    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({error:"Unauthorized"},{status:401}
        )
    }

    await dbconnect()
   try {
    const order=await Order.find({userId:session.user.id}).populate({
        path:'productId',
        select:'name imageUrl',
        options:{strictPopulate:false}
    }).sort({createdAt:-1}).lean()

    return NextResponse.json({order},{status:200})

   } catch (error) {
      console.log('Failed to fetch the orders',error)
      return NextResponse.json({error:'Failed to fetch the orders'}, {status:500})
   }
}