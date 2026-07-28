import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("Please define MONGODB_URL in .env");
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDb = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongodbUrl)
      .then((mongooseInstance) => mongooseInstance.connection);
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