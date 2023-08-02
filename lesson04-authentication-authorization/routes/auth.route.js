import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const users = [
  {
    id: "5306ff7b-1aaa-494a-abdb-663e61c75d00",
    username: "alice",
    password: "alice@123",
    fullname: "Alice H",
  },
  {
    id: "66180a97-a66a-4bb9-b561-37c8803109e8",
    username: "bob",
    password: "bob@123",
    fullname: "Bob Allen",
  },
  {
    id: "91858404-41e3-4a45-8281-45af828db339",
    username: "harry",
    password: "harry@123",
    fullname: "Harry Trinh",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  const existingUser = users.find(
    (u) => u.username === username || u.password === password
  );

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid password or username!",
    });
  }

  const JWT_PRIVATE_KEY = "MINDX_PRIVATE_KEY";

  const userWithoutPassword = {
    username: existingUser.username,
    fullname: existingUser.fullname,
    id: existingUser.id,
  };

  // JWT includes 3 parts and splitted by '.'
  // 1. Header: thông tin thuật toán mã hoá, loại token
  // 2. Payload: thông tin user đính kèm
  // 3. Footer: thông tin liên quan đến signature (mã hoá công khai)
  const token = jwt.sign(userWithoutPassword, JWT_PRIVATE_KEY, {
    expiresIn: "30s",
  });

  return res.json({
    message: "Login successfully",
    data: {
      user: userWithoutPassword,
      token,
    },
  });
});

export default router;
