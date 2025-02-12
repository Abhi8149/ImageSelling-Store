import mongoose, {Schema,models} from "mongoose";
import { ImageVariantType, MyimageVarient } from "./Product";

interface PopulatedUser{
    _id:mongoose.Types.ObjectId;
    email:string
}

interface PopulatedProduct{
    _id:mongoose.Types.ObjectId;
    name:string;
    imageUrl:string;
}

export interface IOrder{
    _id?:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId | PopulatedUser;
    productId:mongoose.Types.ObjectId | PopulatedProduct;
    varient:MyimageVarient;
    razorpayOrderId:string;
    razorpayPaymentId:string;
    amount:number;
    status:"PENDING"|"COMPLETED"|"CANCELLED";
    downloadUrl?:string;
    previewUrl?:string;
    createrAt?:Date;
    updatedAt?:Date;
}

const OrderSchema= new Schema<IOrder>({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    productId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Product',
    },
    varient:{
        type:{
            type:String,
            required:true,
            enum:["SQUARE","WIDE","PORTRAIT"] as ImageVariantType[]
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
    },
    razorpayOrderId:{type:String,required:true},
    razorpayPaymentId:{type:String},
    amount:{type:Number,required:true},
    status:{
        type:String,
        required:true,
        enum:["PENDING","COMPLETED","CANCELLED"],
        default:"PENDING"
    },
    downloadUrl: { type: String },
    previewUrl: { type: String },
},{timestamps:true})

const Order= models?.Order || mongoose.model<IOrder>("Order",OrderSchema)
export default Order;