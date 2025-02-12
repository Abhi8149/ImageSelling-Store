import mongoose, { Schema, models } from "mongoose";

export const IMAGE_VARIANTS = {
    SQUARE: {
      type: "SQUARE",
      dimensions: { width: 1200, height: 1200 },
      label: "Square (1:1)",
      aspectRatio: "1:1",
    },
    WIDE: {
      type: "WIDE",
      dimensions: { width: 1920, height: 1080 },
      label: "Widescreen (16:9)",
      aspectRatio: "16:9",
    },
    PORTRAIT: {
      type: "PORTRAIT",
      dimensions: { width: 1080, height: 1440 },
      label: "Portrait (3:4)",
      aspectRatio: "3:4",
    },
  } as const;


export type ImageVariantType = keyof typeof IMAGE_VARIANTS;

export interface MyimageVarient{
    type:ImageVariantType,
    price:number,
    licenses:"COMMERCIAL"|"PERSONAL"
}
const imageVarientSchema=new Schema<MyimageVarient>({
    type:{
        type:String,
        required:true,
        enum:["SQUARE","WIDE","PORTRAIT"]
    },
    price:{
        type:Number,
        required:true
    },
    licenses:{
        type:String,
        required:true,
        enum:["COMMERCIAL","PERSONAL"]
    }
})

export interface MyProduct{
    _id?:mongoose.Types.ObjectId
    name:String,
    description:String,
    imageUrl:String,
    varients:MyimageVarient[]
}

const ProductSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    varients:[imageVarientSchema]
})

const Product= models?.Product || mongoose.model<MyProduct>("Product",ProductSchema)

export default Product

