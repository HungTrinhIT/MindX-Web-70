import express from "express";
import postRouter from "./posts.js";
import userRouter from "./users.js";
import commentRouter from "./comments.js";
import logAPI from "../middlewares/logAPI.js";

const router = express.Router();

router.use(logAPI);

router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);

export default router;
