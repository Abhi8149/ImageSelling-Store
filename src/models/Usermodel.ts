import mongoose, {Schema,models} from "mongoose";

interface IUser{
    id?:mongoose.Types.ObjectId;
    email:string;
    password:string;
    role: "user" | "admin";
    createrAt?:Date;
    updatedAt?:Date;
}

const UserSchema=new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})

const User=models?.User || mongoose.model<IUser>("User",UserSchema)

export default User

