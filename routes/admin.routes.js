import express from 'express'
import User from '../models/User.js';
import Charity from '../models/Charity.js';
import { authMiddleware } from '../midllewares/auth.middleware.js';
import { adminMiddleware } from '../midllewares/admin.middleware.js';
const router = express.Router()


router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// GET all charities
router.get("/charities", authMiddleware, adminMiddleware, async (req, res) => {
    const charities = await Charity.find();
    res.json(charities);
})

export default router