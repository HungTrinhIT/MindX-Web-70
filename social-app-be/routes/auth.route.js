import express from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import AuthController from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { loginSchema } from '../validations/login.shema.js';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), AuthController.loginUser);

router.post('/register', AuthController.registerUser);

router.get('/me', authMiddleware, AuthController.getMe);

export default router;
