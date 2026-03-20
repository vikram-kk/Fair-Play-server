import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'





export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json("enter all the fields")
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter email and password" });
        }
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json("User not found");


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Wrong password");

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );
        res.json({ token, user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

