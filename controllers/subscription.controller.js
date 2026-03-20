import User from "../models/User.js"

export const subscribe = async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.user.id;
        if (!plan) {
            return res.status(401).json({ message: "Plan required" })
        }
        const user = await User.findById(userId)
        let expiryDate = new Date();
        if (plan == "monthly") {
            expiryDate.setMonth(expiryDate.getMonth() + 1)
        } else if (plan == "yearly") {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1)
        } else {
            return res.status(400).json({ message: "Invalid plan" });
        }
        user.subscription = {
            plan,
            status: "active",
            expiryDate
        };

        await user.save();
        // console.log(user)

        res.json(user.subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}