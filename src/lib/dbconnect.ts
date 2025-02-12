import mongoose from "mongoose";

declare global {
    var mongoose: { conn: any; promise: any};
}



const MONGO_URI=process.env.MONGO_URI!;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

let cached=global.mongoose;
if (!cached) {
    cached=global.mongoose={conn:null, promise: null};
}

export async function dbconnect(){
    if(cached.conn){
        console.log('Using existing database connection')
        return cached.conn;
    }

    if(!cached.promise){
        const opts={
            bufferCommands: true,
            maxpoolSize: 10,
        }
        cached.promise=mongoose.connect(MONGO_URI,opts).then((mongoose)=>{
            mongoose.connection
        })
    }

    try {
        cached.conn=await cached.promise;
        console.log('Connected to MongoDB')
    } catch (error) {
        cached.promise=null;
        console.log('Error connecting to MongoDB')
        throw error
    }

    return cached.conn;
}