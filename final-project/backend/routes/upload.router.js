import express from "express";
import upload from "../configs/multer.config.js";
import CloudinaryService from "../services/cloudinary.service.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import UserModel from "../models/user.model.js";

const uploadRouter = express.Router();

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

      const { url } = await CloudinaryService.uploadFile(file.path);

      //Update user avatar
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user.id },
        {
          avatar: url,
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
