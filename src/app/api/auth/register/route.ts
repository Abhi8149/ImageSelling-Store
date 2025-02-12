import { dbconnect } from "@/lib/dbconnect";
import User from "@/models/Usermodel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { email, password, role } = await req.json();

    if(!email || !password){
        return NextResponse.json({
            success:false,
            message:"Please enter both email and password"
        },{status:400})
    }

    await dbconnect();

    try {
         const user=await User.findOne({email})
         if(user){
            return NextResponse.json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const newuser=await User.create({email,password:hashedPassword,role:role})

        await newuser.save();

        return NextResponse.json({
            success:true,
            message:"User created successfully"
        })

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}