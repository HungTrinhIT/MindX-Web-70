import express from "express";
import { posts } from "./utils/mockData.js";

const app = express();
const PORT = 3000;

app.get("/api/v1/posts", (req, res) => {
  return res.json({
    data: posts,
  });
});

app.get("/api/v1/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === +req.params.id);
  if (!post) {
    return res.json({
      message: "Resource not found",
    });
  }

  res.json({
    data: posts,
  });
});

app.post("/api/v1/posts/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
