import express from "express";
import StudentRouter from "./student.route.js";
import TeacherRouter from "./teacher.route.js";
import SubjectRouter from "./subject.route.js";

import { apiLogMiddleware } from "../middlewares/apiLog.middleware.js";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";
import { statisticMiddleware } from "../middlewares/stats.middleware.js";

const router = express.Router();

router.use(apiLogMiddleware);
router.use(authenticateMiddleware);

router.use("/students", statisticMiddleware("student"), StudentRouter);
router.use("/teachers", statisticMiddleware("teacher"), TeacherRouter);
router.use("/subjects", statisticMiddleware("subject"), SubjectRouter);

export default router;
