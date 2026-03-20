export const getDashboard = async (req, res) => {
    try {
        const user = req.user;

        res.json({
            subscription: user.subscription,
            scores: user.scores,
            charity: user.charity,
            totalScores: user.scores.length
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};