import express from 'express'
import { subscribe } from '../controllers/subscription.controller.js'
import { authMiddleware } from '../midllewares/auth.middleware.js'

const router = express.Router()

router.post("/subscribe", authMiddleware, subscribe)

export default router 