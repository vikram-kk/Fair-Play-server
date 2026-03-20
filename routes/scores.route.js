import express from 'express'
import { addScore } from '../controllers/score.controller.js'
import { authMiddleware } from '../midllewares/auth.middleware.js'


const router = express.Router()

router.post('/add', authMiddleware, addScore)

export default router