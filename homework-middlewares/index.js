import express from "express";
import router from "./routes/index.js";

import { apiLogMiddleware } from "./middlewares/apiLog.middleware.js";

const app = express();
const PORT = 3001;
const API_VERSION = 1;

export const users = [
  { username: "alice", apiKey: "alice@123" },
  { username: "bob", apiKey: "bob@123" },
  { username: "charlie", apiKey: "charlie@123" },
];

export const stats = [];

router.use(apiLogMiddleware);

app.get(`/api/v${API_VERSION}/system/statistic`, (req, res) => {
  return res.json(stats);
});
app.use(`/api/v${API_VERSION}`, router);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
