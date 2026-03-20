import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },

    subscription: {
        plan: String,
        status: { type: String, default: "inactive" },
        expiryDate: Date
    },
    scores: [
        {
            value: Number,
            date: Date
        }
    ],
    charity: {
        name: String,
        percentage: { type: Number, default: 10 }
    }
})

export default mongoose.model("User", userSchema)