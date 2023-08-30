import express from "express";
import { loginSchema } from "../validations/login.validation.js";
import { registerSchema } from "../validations/register.validation.js";
import AuthController from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validationMdw } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/login", validationMdw(loginSchema), AuthController.login);

router.post(
  "/register",
  validationMdw(registerSchema),
  AuthController.register
);

router.get("/me", authMiddleware, AuthController.getMe);

export default router;

// maintain
// scale up
