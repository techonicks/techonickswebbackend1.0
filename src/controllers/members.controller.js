import { UserInfo } from "../models/userInfo.model.js";

export async function getMembers(req, res) {
  const members = await UserInfo.find();
  let response = members.map(
    ({ name, role, email, avatar, department, year, description }) => ({
      name,
      role,
      email,
      avatar,
      department,
      year,
      description,
    })
  );
  return res.json({
    success: true,
    status: "S",
    message: "All members retrieved successfully",
    response,
  });
}
