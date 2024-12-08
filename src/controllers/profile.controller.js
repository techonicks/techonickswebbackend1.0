import mongoose from "mongoose";
import { UserProfile } from "../models/profile.model.js";
import { UserInfo } from "../models/userInfo.model.js";
import uploadFile from "../uploads/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export async function editBio(req, res, next) {
  const { description, email } = req.body;
  const user = await UserInfo.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      status: "F",
      message: "User not found",
    });
  }
  user.description = description;
  const response = await user.save();
  console.log(response);
  return res.json({
    success: true,
    status: "S",
    message: "Bio updated successfully",
    response: user,
  });
}

export async function createPost(req, res) {
  const { email, caption } = req.body;

  const user = await UserProfile.findOne({ userEmail: email });

  if (!user) {
    return res.json({
      success: false,
      status: "F",
      message: "User not found",
    });
  }

  const imageUri = getDataUri(req.file);
  const imageSrc = await uploadFile(imageUri.content);

  user.posts.push({
    id: new mongoose.Types.ObjectId(),
    image: imageSrc,
    caption,
    reactions: [],
    comments: [],
    createdAt: new Date(Date.now()).toISOString(),
    updatedAt: new Date(Date.now()).toISOString(),
  });

  const response = await user.save();

  if (response) {
    return res.json({
      success: true,
      status: "S",
      message: "Post created successfully",
      response: user,
    });
  } else {
    return res.json({
      success: false,
      status: "F",
      message: "Failed to create post",
    });
  }
}
