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
	const totalPages = Math.ceil(totalPosts / limit);

	return res.json({
		data: postsWithPagination,
		pagination: {
			totalPages,
			totalCount: totalPosts,
			page: page,
			pageSize: limit,
		},
	});
});

const getAllPostsByUser = asyncHandler(async (req, res) => {
	const userId = req.user.id;

	const currentUser = await UserModel.findById(userId);

	if (!currentUser) {
		res.status(400);
		throw new Error('User not found');
	}

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	const totalPosts = await PostModel.countDocuments();
	const totalPages = Math.ceil(totalPosts / limit);

	const posts = await PostModel.find({ user: userId }).skip(skip).limit(limit);

	return res.json({
		data: posts,
		pagination: {
			totalPages,
			totalCount: totalPosts,
			page,
			pageSize: limit,
		},
	});
});
const getSingle = asyncHandler(async (req, res) => {
	const postId = req.params.id;

	const post = await PostModel.findById(postId).populate(
		'user',
		'fullname email id',
	);

	if (!post) {
		res.status(400);
		throw new Error('Post not found');
	}

	res.json(post);
});

const updatePost = asyncHandler(async (req, res) => {
	const postId = req.params.id;
	const { title, content } = req.body;
	const userId = req.user.id;

	const post = await PostModel.findById(postId);

	if (!post) {
		res.status(400);
		throw new Error('Post not found');
	}

	if (post.user.toString() !== userId) {
		res.status(403);
		throw new Error('Unauthorized access');
	}

	post.title = title;
	post.content = content;
	post.updatedAt = new Date();

	const updatedPost = await post.save();

	res.json(updatedPost);
});

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
