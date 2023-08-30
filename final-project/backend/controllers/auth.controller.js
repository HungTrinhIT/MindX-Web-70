import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   1. Check authentication
  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // 2. Check password
  const isMatchPassword = await bcrypt.compare(password, existingUser.password);

  if (!isMatchPassword) {
    res.status(401);
    throw new Error("Email or password is not correct!");
  }

  // Create JWT Token & Response to client
  const jwtPayload = {
    email: existingUser.email,
    id: existingUser.id,
    fullname: existingUser.fullname,
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    accessToken: token,
    message: "Login successfully",
  });
});

const register = asyncHandler(async (req, res) => {
  const { email, fullname, password } = req.body;

  // 1. Check user exist
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User has already exist");
  }

  // 2. Create new user, insert into DB
  // 2.1 Has password (mã hoá password)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 2.2 Create new user object
  const newUser = new UserModel({
    email,
    fullname,
    password: hashedPassword,
  });

  // Insert new record into collection
  await newUser.save();

  // 3. Response to client
  res.status(201).json({
    message: "Register new user successfully",
  });
});

const getMe = async (req, res) => {
  const { id } = req.user;
  const currentUser = await UserModel.findById(id).select("-password");

  if (!currentUser) {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  res.json({
    userInfo: currentUser,
  });
};

const AuthController = {
  login,
  register,
  getMe,
};

export default AuthController;

// ADVANCED
// caching (redis)
// realtime notification (kafka)
// distributed lock system
// round-robin (OS)
// net-working
// Security: HSA, RSA
// Database: system design
