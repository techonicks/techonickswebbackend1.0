import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  type: {
    type: String,
    enum: ["past", "ongoing", "upcoming"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfo",
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Participants",
  },
});

const Events = mongoose.model("Events",eventSchema)
export default Events
