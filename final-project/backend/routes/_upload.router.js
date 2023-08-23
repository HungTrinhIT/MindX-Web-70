import express from "express";
import upload from "../configs/multer.config.js";
import { v2 as cloudinary } from "cloudinary";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import UserModel from "../models/user.model.js";

const uploadRouter = express.Router();

cloudinary.config({
  cloud_name: "hypertal",
  api_key: "128245271721292",
  api_secret: "z7A4b2fS5Tp0sTuLMkkWAmNqpaU",
});

uploadRouter.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      const user = req.user;

      if (!file) {
        return res
          .status(400)
          .json({ error: "No file uploaded or an error occurred" });
      }

      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        folder: "social-apps",
      });

      //Update user avatar
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user.id },
        {
          avatar: result?.secure_url,
        },
        {
          new: true,
        }
      ).select("-password");

      res
        .status(200)
        .json({ message: "Avatar uploaded successfully", data: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

export default uploadRouter;
