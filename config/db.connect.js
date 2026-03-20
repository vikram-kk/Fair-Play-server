import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
}

