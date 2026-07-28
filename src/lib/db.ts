import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("Please define MONGODB_URL in .env");
}

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDb = async () => {
  // Already connected
  if (cache.conn) {
    return cache.conn;
  }

  // Create connection only once
  if (!cache.promise) {
    cache.promise = mongoose.connect(mongodbUrl);
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
};

export default connectDb;