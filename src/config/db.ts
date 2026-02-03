import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoURI = process.env.MONGODB_URI as string

export const connectDB = async () => {
    try {
        await mongoose.connect(MongoURI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1)
    }
}