import mongoose from "mongoose";

const mongodbUrl=process.env.MONGODB_URL

if(!mongodbUrl){
throw new Error("db error")
}


let cache = global.mongoose
if(!cache) {
    cache = global.mongoose={conn:null , promise:null}
}


const connectDb =  async ()  => {
  if(cache.conn) {
    return cache.conn
  }
}