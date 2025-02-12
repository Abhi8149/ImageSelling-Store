import { dbconnect } from "@/lib/dbconnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";


//Here I changed from original code to something of mine if error occurs then check here as well
export async function GET(request:NextRequest,{params}:{params:{id:string}}){
    try {
        await dbconnect();
        const {id}=await params
        console.log(id);
        const product=await Product.findById(id);

        if(!product || product.length===0){
            return NextResponse.json({
                success:false,
                error:'No product found'
            },{status:404})
        }
        return NextResponse.json({
            success:true,
            message:product
        },{status:200})

    } catch (error) {
        console.log('Failed to fetch the product',error)
        return NextResponse.json({
            success:false,
            error:'Failed to fetch the selected product'
        },{status:500})
    }
}