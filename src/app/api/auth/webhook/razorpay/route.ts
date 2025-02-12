import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import Order from "@/models/Orders";
import nodemailer from 'nodemailer';
export async function POST(request:NextRequest) {
    try {
        const body=await request.text();
        console.log(body)
        const signature=request.headers.get("x-razorpay-signature");
        const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_WEBHOOK_SECRET!).update(body).digest("hex");
        console.log(signature)
        if(signature!==expectedSignature){
            return NextResponse.json({
                error:"Invalid signature"
            },{status:400})
        }
    
        const event=JSON.parse(body)
        console.log(event)
    
        if(event.event=='Payment.captured'){
            // Payment captured
            const payment=event.payload.payment.entity;
            const order=await Order.findByIdAndUpdate({razorpayOrderId:payment.order._id},
              {razorpayPaymentId:payment.id,
                status:"COMPLETED"
              }
            ).populate([
                {path:'userId', select:'email'},
                {path:'productId', select:'name'}
            ])
    
            // if(order){
            //     //send email only when order is captured
            //     const transporter = nodemailer.createTransport({
            //         host: "sandbox.smtp.mailtrap.io",
            //         port: 587,
            //         secure: false, // true for port 465, false for other ports
            //         auth: {
            //           user: process.env.MAILTRAP_USERNAME,
            //           pass: process.env.MAILTRAP_PASSWORD,
            //         },
            //       });
    
            //       await transporter.sendMail({
            //         from: '"ImageKit Shop" <noreply@imagekitshop.com>',
            //         to: order.userId.email,
            //         subject: "Payment Confirmation - ImageKit Shop",
            //         text: `
            //         Thank you for your purchase!
                    
            //         Order Details:
            //         - Order ID: ${order._id.toString().slice(-6)}
            //         - Product: ${order.productId.name}
            //         - Version: ${order.variant.type}
            //         - License: ${order.variant.license}
            //         - Price: $${order.amount.toFixed(2)}
                    
            //         Your image is now available in your orders page.
            //         Thank you for shopping with ImageKit Shop!
            //                     `.trim(),
            //        });
                   
            // }
          
            return NextResponse.json({
                recieved:true
            },{status:200})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            recieved:false
        },{status:500})
    }
}