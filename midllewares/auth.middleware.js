import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided or malformed header" });
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);


        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        // console.log("user decoded");

        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}