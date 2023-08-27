import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //   1. Check authentication
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    // 2. Check password
    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Username or password is not correct!",
      });
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
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  const { email, fullname, password } = req.body;

  try {
    // 1. Check user exist
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User has already exist",
      });
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
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMe = async (req, res) => {
  const { id } = req.user;
  const currentUser = await UserModel.findById(id).select("-password");

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
