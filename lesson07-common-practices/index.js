import "dotenv/config";
import express from "express";

import router from "./routes/index.js";
import { connectToDB } from "./configs/db.config.js";
const app = express();
const PORT = 3001;

//Connect to database
connectToDB();

// global middlewares
app.use(express.json());

// routes
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
