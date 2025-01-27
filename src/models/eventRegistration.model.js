import mongoose, { Schema } from "mongoose"

const participantSchema = new Schema({
    eventName : {
        type: String,
        required : true,
    },
    participantName : {
        type: String,
        required: true,
    },
    participantEmail : {
        type: String,
        required: true,
        unique: true,
    },
    participantYear : {
        type: String,
        required: true,
        enum : ["1st", "2nd", "3rd","4th"],
    },
    participantBranch : {
        type: String,
        required: true,
        enum : ["CSE","ECE","EE","ME","CE"],
    },
    participantRollNumber : {
        type: String,
        required: true,
    },
    participantContactNumber : {
        type: String,
        required: true,
    },
    subEvents : {
        type : [String],
    }
})

export const Participants = mongoose.model("Participants",participantSchema)