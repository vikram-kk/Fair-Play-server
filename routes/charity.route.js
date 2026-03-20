import express from 'express'
import { authMiddleware } from '../midllewares/auth.middleware.js';
import { selectCharity, getCharities } from '../controllers/charity.controller.js';
const router = express.Router()

router.get("/", getCharities);
router.post("/select", authMiddleware, selectCharity);

export default router 