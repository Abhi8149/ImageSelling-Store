import { dbconnect } from "@/lib/dbconnect";
import Product, { MyProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request:NextRequest) {
    await dbconnect()
    try {
        const product=await Product.find({})
        // console.log('the product list is here',product)
        if(!product || product.length===0){
            return NextResponse.json({
                error:'No products found'
            },{status:404})
        }
        return NextResponse.json({
            message:product
        },{status:200})
    } catch (error:any) {
        console.log('Failed to fetch the products',error)
        return NextResponse.json({
            error:'Failed to fetch the products'
        },{status:500})
    }
}

export async function POST(request:NextRequest){
    try {
    const session=await getServerSession(authOptions)
   console.log(session)
    // if(!session || session.user?.role!=='user'){
    //     return NextResponse.json({
    //         error:'Unauthorized'
    //     },{status:401})
    // }
    const body:MyProduct=await request.json()
    console.log(body)
    if(!body.name || !body.description || !body.imageUrl || !body.varients){
        return NextResponse.json({
            error:'Missing required fields'
        },{status:400})
    }
        await dbconnect()
        const product=await Product.create(body)
        await product.save()
        return NextResponse.json({
            product
        },{status:201})
    } catch (error) {
        console.log('Failed to create product',error)
        return NextResponse.json({
            error:'Failed to create product'
        },{status:500})
    }
}