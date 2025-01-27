import Events from "../models/event.model.js";
import { Participants } from "../models/eventRegistration.model.js";
import uploadFile from "../uploads/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export async function createEvent(req, res) {
  console.log(req.body);
  
  const { user, title, description, date, type } = req.body;

  const imageUri = getDataUri(req.file);
  const imageSrc = await uploadFile(imageUri.content);

  const newEvent = await Events.create({
    image: imageSrc,
    title: title,
    description: description,
    link: `events/${title.replace(" ", "-").toLowerCase()}`,
    date: date ? date : "",
    type: type,
    createdBy: user._id,
  });

  if (newEvent) {
    return res.json({
      success: true,
      status: "S",
      message: "Event created successfully",
      response: newEvent,
    });
  } else {
    return res.json({
      success: false,
      status: "F",
      message: "Failed to create event",
    });
  }
}

export async function registerForEvent(req,res){
  const { eventName, participantName, participantEmail , participantYear, participantBranch, participantRollNumber, participantContactNumber, subEvents } = req.body;
  const event = await Events.findOne({title:eventName});
  if(!event){
    return res.json({
      success: false,
      status: "F",
      message: "Event not found",
    });
  }

  const participant = await Participants.findOne({participantEmail})
  if(participant){
    return res.json({
      success: false,
      status: "F",
      message: "You are already a participant",
    });
  }
  const newParticipant = await Participants.create({
    eventName,
    participantName,
    participantEmail,
    participantYear,
    participantBranch,
    participantRollNumber,
    participantContactNumber,
    subEvents,
  });
  if(!newParticipant){
    return res.json({
      success: false,
      status: "F",
      message: "Failed to register for event",
    });
  }
  event.participants.push(newParticipant._id);

  await event.save();
  res.json({
    success: true,
    status: "S",
    message: `Participant registered successfully for ${event.title}`,
    response: newParticipant,
  })
}
