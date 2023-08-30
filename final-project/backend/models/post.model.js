import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  backgroundColor: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
