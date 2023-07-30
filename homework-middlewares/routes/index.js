import express from "express";
import StudentRouter from "./student.route.js";
import TeacherRouter from "./teacher.route.js";
import SubjectRouter from "./subject.route.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { statisticMiddleware } from "../middlewares/stats.middleware.js";

const router = express.Router();

router.use(
  "/students",
  authMiddleware,
  statisticMiddleware("student"),
  StudentRouter
);
router.use(
  "/teachers",
  authMiddleware,
  statisticMiddleware("teacher"),
  TeacherRouter
);
router.use(
  "/subjects",
  authMiddleware,
  statisticMiddleware("subject"),
  SubjectRouter
);

export default router;
