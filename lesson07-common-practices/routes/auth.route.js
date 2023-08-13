import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

const userMockData = [
  {
    id: "1",
    username: "alice",
    password: "alice@123",
    fullname: "Alice H",
  },
  {
    id: "2",
    username: "bob",
    password: "bob@123",
    fullname: "Bobby",
  },
  {
    id: "3",
    username: "Charlie",
    password: "charlie@123",
    fullname: "Charlie Put",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  //   1. Validation
  if (!username || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  //   2. Check authentication
  const existingUser = userMockData.find(
    (u) => u.username === username && u.password === password
  );

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid username or password!",
    });
  }

  //   3. Generate access token (JWT)
  //   - Header: thuật toán mã hoá(HS256) + loại token(JWT)
  //   - Body: chứa thông tin mà developer muốn đính kèm vào token (Thông tin không nhạy cảm)
  //   - Footer: chứa thông tin về chữ ký (khoá bí mật -> SECRET_KEY)
  //   - Mỗi thành phần cách nhau bởi dấu "."

  const jwtPayload = {
    username: existingUser.username,
    id: existingUser.id,
    fullname: existingUser.fullname,
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: "30s",
  });

  res.json({
    user: jwtPayload,
    accessToken: token,
  });
});

router.post("/register", async (req, res) => {
  const { email, fullname, password } = req.body;

  try {
    // 1. Validation
    if (!email || !fullname || !password) {
      return res.status(400).json({
        message: "Missing required keys",
      });
    }

    // 2. Check user exist
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.json({
        message: "User has already exist",
      });
    }

    // 3. Create new user, insert into DB
    // 3.1 Has password (mã hoá password)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3.2 Create new user object
    const newUser = new UserModel({
      email,
      fullname,
      password: hashedPassword,
    });

    // Insert new record into collection
    await newUser.save();

    // 4. Response to client
    res.status(201).json({
      message: "Register new user successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/me", (req, res) => {});

export default router;
