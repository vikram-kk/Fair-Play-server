import express from "express";
import { runDraw } from "../controllers/draw.controller.js";

const router = express.Router();

router.get("/run", runDraw);

export default router;