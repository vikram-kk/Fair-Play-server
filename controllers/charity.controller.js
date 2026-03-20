import Charity from "../models/Charity.js"
import User from "../models/User.js";

export const getCharities = async (req, res) => {
    try {
        const charity = await Charity.find()
        res.json(charity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const selectCharity = async (req, res) => {
    try {
        const { charityId, percentage } = req.body
        const userId = req.user.id

        if (!percentage || percentage < 10) {
            return res.json({
                message: "Minimum 10%"
            })
        }

        const charity = await Charity.findById(charityId)
        if (!charity) {
            return res.status(404).json({ message: "Charity not found" });
        }
        const user = await User.findById(userId);
        user.charity = {
            name: charity.name,
            percentage
        };
        await user.save();

        res.json(user.charity);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}