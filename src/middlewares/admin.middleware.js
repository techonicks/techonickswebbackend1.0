import { UserInfo } from "../models/userInfo.model.js";

export async function isAdmin(req, res, next) {
  const { email } = req.body;
  console.log(req.body);
  const user = await UserInfo.findOne({ email });
  console.log(user);
  
  console.log(email);

  if (!user) {
    return res.json({
      success: false,
      status: "F",
      message: "User not found",
    });
  }

  if (user.role !== "incharge") {
    return res.json({
      success: false,
      status: "F",
      message: "Only incharge users can access this route",
    });
  }

  req.body.user = user
  next()
}
