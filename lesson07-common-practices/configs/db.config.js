import mongoose from "mongoose";

const MONGO_URI = "mongodb://0.0.0.0:27017/mindx-web70-social-apps";

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`Database connected at ${connection.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};