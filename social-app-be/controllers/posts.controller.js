import asyncHandler from 'express-async-handler';
import UserModel from '../models/users.model.js';
import PostModel from '../models/posts.model.js';

const createNewPost = asyncHandler(async (req, res) => {
	const { title, content, backgroundColor } = req.body;
	const userId = req.user.id;

	// Find the user who is creating the post
	const user = await UserModel.findById(userId);

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}

	// Create the post
	const post = new PostModel({
		title,
		content,
		backgroundColor,
		user: userId,
	});

	// Save the post
	await post.save();

	res.status(201).json({
		message: 'Creating new post successfully',
		dat: post,
	});
});
const getAllPosts = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	const postsWithPagination = await PostModel.find().skip(skip).limit(limit);
	const totalPosts = await PostModel.countDocuments();
	const totalPages = await Math.ceil(totalPosts / limit);

	return res.json({
		data: postsWithPagination,
		pagination: {
			totalCount: totalPosts,
			pageCount: postsWithPagination.length,
			page: page,
			totalPages,
			perPage: limit,
		},
	});
});

const getSingle = asyncHandler(async (req, res) => {});
const getAllPostsByUser = asyncHandler(async (req, res) => {});
const updatePost = asyncHandler(async (req, res) => {});
const deletePost = asyncHandler(async (req, res) => {});

const PostController = {
	create: createNewPost,
	getAll: getAllPosts,
	getAllPostsByUsers: getAllPostsByUser,
	getSingle,
	updatePost,
	deletePost,
};

export default PostController;
