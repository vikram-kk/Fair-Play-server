export const checkSubscription = (req, res, next) => {
    const user = req.user;

    if (!user.subscription || user.subscription.status !== "active") {
        return res.status(403).json({ message: "No active subscription" });
    }

    next();
};