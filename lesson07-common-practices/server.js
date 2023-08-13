import "dotenv/config";
import express from "express";

import router from "./routes/index.js";
import { connectToDatabase } from "./configs/db.config.js";
const app = express();
const PORT = 3001;

// 1. Create connection to database
connectToDatabase();

// 2. Global middlewares
app.use(express.json());

// 3. Routing
app.use("/api/v1", router);

// 4. Error handling

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
