import express from "express";
import jwt from "jsonwebtoken";

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

export default router;
