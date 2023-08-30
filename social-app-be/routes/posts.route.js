import express from 'express';
import PostController from '../controllers/posts.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { postSchemaValidation } from '../validations/post.schema.js';
const router = express.Router();

// All of Post API need be a protected route
router.use(authMiddleware);

router.get('/all', PostController.getAll);
router.get('/owners', PostController.getAllPostsByUsers);
router.get('/:id', PostController.getSingle);
router.post('/', validateSchema(postSchemaValidation), PostController.create);
router.put(
	'/:id',
	validateSchema(postSchemaValidation),
	PostController.updatePost,
);
router.delete('/:id', PostController.deletePost);

export default router;
