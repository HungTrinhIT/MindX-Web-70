import express from "express";
import router from "./routes/index.js";
import { stats } from "./middlewares/stats.middleware.js";

const app = express();
const PORT = 3001;
const API_VERSION = 1;

export const users = [
  { username: "alice", apiKey: "alice@123" },
  { username: "bob", apiKey: "bob@123" },
  { username: "charlie", apiKey: "charlie@123" },
];

app.use(`/api/v${API_VERSION}`, router);

app.get("/system/statistic", (req, res) => {
  return res.json(stat);
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
