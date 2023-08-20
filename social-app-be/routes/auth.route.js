import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log({ data: req.body });

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid username or password!!!",
      });
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Invalid username or password!",
      });
    }

    const jwtPayload = {
      email: existingUser.email,
      id: existingUser.id,
      fullname: existingUser.fullname,
      fullname: existingUser.fullname,
    };

    const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      accessToken: token,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!email || !fullname || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User has already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      fullname,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: "User create successfully" });
  } catch (error) {
    console.log("Somethings went wrong");
    res.status(500).json(error);
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const { id: userId } = req.users;
  try {
    const existingUser = await UserModel.findById(userId).select("-password");
    return res.json(existingUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
