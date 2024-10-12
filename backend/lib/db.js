import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connecting = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is connected: ${connecting.connection.host}`);
    }
    catch (error) {
        console.error(`Error Connecting to MongoDB: ${error.message}`);
        process.exit(1)

    }
};