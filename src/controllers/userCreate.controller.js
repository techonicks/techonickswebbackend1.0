import { UserProfile } from "../models/profile.model.js";
import { UserInfo } from "../models/userInfo.model.js";
import uploadFile from "../uploads/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export async function createUser(req, res) {
  let user = await UserInfo.findOne({ email: req.body.email });

  if (user) {
    return res.json({
      success: false,
      status: "F",
      message: "Email is already in use",
    });
  }

  // image upload

  const avatarUri = getDataUri(req.file)
  const avatarSrc = await uploadFile(avatarUri.content)

  const newUserInfo = await UserInfo.create({
    // avatar
    avatar: avatarSrc,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    year : req.body.year,
    department : req.body.department,
  });

  const newUserProfile = await UserProfile.create({
    userEmail : req.body.email,
  })

  if (newUserInfo) {
    return res.status(200).json({
      success: true,
      status: "S",
      message: "User created successfully",
      response: newUserInfo,
    });
  } else {
    return res.json({
      success: false,
      status: "F",
      message: "Failed to create user",
    });
  }
}
