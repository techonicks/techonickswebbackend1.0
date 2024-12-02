import { UserInfo } from "../models/userInfo.model.js";
import { comparePasswords } from "../utils/passwordManager.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserInfo.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      status: "I",
      message: "User not found",
    });
  }
  
  const isMatch = await comparePasswords(password, user.password);


  if (isMatch) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 10000000 * 10),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        status: "S",
        message: "User Logged in successfully",
        response: user,
      });
  } else {
    return res.status(203).json({
      success: false,
      status: "I",
      message: "Incorrect password",
    });
  }
}

export async function logout(req, res) {
  if (!req.cookies.token) {
    return res.json({
      success: false,
      status: "F",
      message: "User is already logged out",
    });
  }

  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    status: "S",
    message: "User Logged out successfully",
  });
}


export async function findUserByToken(req, res) {
  const { token } = req.cookies;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken._id);
  const user = await UserInfo.findById(decodedToken._id);
  if (user) {
    console.log(user);
    return res.status(200).json({
      success: true,
      status: "S",
      message: "User found successfully",
      response: user,
    });
  } else {
    return res.status(401).json({
      success: false,
      status: "I",
      message: "Invalid token",
    });
  }
}
