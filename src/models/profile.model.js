import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  following: {
    type: Number,
    required: true,
    default: 0,
  },
  followers: {
    type: Number,
    required: true,
    default: 0,
  },
  posts: {
    type: [
      {
        image: String,
        caption: String,
        reactions: [
          {
            reactor: String,
          },
        ],
        comments: [
          {
            commentetor: String,
            comment: String,
            timeStamp: String,
          },
        ],
        createdAt: String,
        updatedAt: String,
      },
    ],
    default: [],
  },
});

export const UserProfile = mongoose.model("UserProfile",profileSchema) 
