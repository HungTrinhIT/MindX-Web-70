import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";

// Get all new feeds
const getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 3
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const posts = await PostModel.find().skip(skip).limit(size);
  const totalPosts = await PostModel.countDocuments();
  const totalPages = Math.ceil(totalPosts / size);

  res.json({
    data: posts,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalPosts,
      totalPages,
    },
  });
});

// Get all owner
const getAllOwnerPosts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1; // 3
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const posts = await PostModel.find({ user: userId }).skip(skip).limit(size);
  const totalPosts = await PostModel.countDocuments();
  const totalPages = Math.ceil(totalPosts / size);

  res.json({
    data: posts,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalPosts,
      totalPages,
    },
  });
});

const create = asyncHandler(async (req, res) => {
  const { title, content, backgroundColor, image } = req.body;
  const userId = req.user.id;

  // Find the user who is create the post
  const currentUser = await UserModel.findById(userId);

  if (!currentUser) {
    res.status = 400;
    throw new Error("User not found");
  }

  // Create new post
  const newPost = new PostModel({
    title,
    content,
    backgroundColor,
    user: userId,
  });

  // Save post to database
  await newPost.save();

  res.status(201).json({
    data: newPost,
    message: "Create new post successfully",
  });
});

const update = asyncHandler(async (req, res) => {});
const getSingle = asyncHandler(async (req, res) => {});
const remove = asyncHandler(async (req, res) => {});

const PostController = {
  getAllPosts,
  getAllOwnerPosts,
  create,
  update,
  getSingle,
  remove,
};

export default PostController;
