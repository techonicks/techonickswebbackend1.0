import mongoose, { Schema } from "mongoose";
import { hashPassword } from "../utils/passwordManager.js";

const userInfoSchema = new Schema(
  {
    avatar: {
      type: String,
      default : "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["incharge", "core-member", "member"],
      required: true,
    },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th"],
      required: true,
    },
    department: {
      type: String,
      enum: ["CE", "CSE", "ECE", "EE", "ME"],
      required: true,
    },
    description: {
      type: String,
      default : "",
    },
    socials: {
      type: [{ handle: String, link: String }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userInfoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    console.log(error);
    return next();
  }
});

export const UserInfo = mongoose.model("UserInfo", userInfoSchema);
