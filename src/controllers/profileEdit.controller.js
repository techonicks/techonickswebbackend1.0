import { UserInfo } from "../models/userInfo.model.js"

export async function editBio(req,res,next){
    const {description,email} = req.body
    const user = await UserInfo.findOne({email})
    if(!user){
        return res.json({
            success: false,
            status: 'F',
            message: 'User not found'
        })
    }
    user.description = description
    const response = await user.save()
    console.log(response);
    return res.json({
        success: true,
        status: 'S',
        message: 'Bio updated successfully',
        response: user
    })
}