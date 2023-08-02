import express from "express";
import authRouter from "./auth.route.js";
import postRouter from "./posts.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", authMiddleware, postRouter);

export default router;
