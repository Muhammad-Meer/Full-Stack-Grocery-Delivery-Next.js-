import mongoose from "mongoose";

const mongodbUrl=process.env.MONGODB_URL

if(!mongodbUrl){
throw new Error("db error")
}


const cache = global.mongoose
