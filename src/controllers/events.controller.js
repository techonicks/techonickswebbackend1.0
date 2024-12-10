import Events from "../models/event.model.js";
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
