import "dotenv/config";
import express from "express";
import appRouter from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/v1", appRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
