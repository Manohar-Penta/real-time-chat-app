import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.mongodb_uri);
  } catch (err) {
    throw new Error(err);
  }
}
