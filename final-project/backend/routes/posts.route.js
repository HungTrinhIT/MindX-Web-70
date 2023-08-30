import express from "express";
import PostController from "../controllers/post.controller.js";
import { validationMdw } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { PostValidationSchema } from "../validations/post.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/all", PostController.getAllPosts);
router.get("/owners", PostController.getAllOwnerPosts);
router.get("/:id", PostController.getSingle);
router.post("/", validationMdw(PostValidationSchema), PostController.create);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.remove);

export default router;
