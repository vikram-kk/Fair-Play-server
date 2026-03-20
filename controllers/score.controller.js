import User from "../models/User.js";

export const addScore = async (req, res) => {
    try {
        let { value, date } = req.body;
        value = Number(value)
        const userId = req.user._id;
        if (!value || value > 45 || value < 1) {
            return res.status(400).json({
                message: "value must be in range of 1 to 45"
            })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        user.scores.push({ value, date });
        if (user.scores.length > 5) {
            user.scores = user.scores.slice(-5);
        }
        user.scores.sort((a, b) => new Date(b.date) - new Date(a.date));
        await user.save()
        res.json(user.scores);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


