import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import UserRegisterSchema from "../Models/userRegisterSchema.js"

export const userLogin = async(req, res) => {
  const { email, password } = req.body
  const AccessToken = process.env.ACCESS_TOKEN
  const RefreshToken = process.env.REFRESH_TOKEN

  try{
    const user = await UserRegisterSchema.findOne({email})
    if(!user){
      return res.status(404).json({message:"User Not Found"})
    }

    const matchpassword = await bcrypt.compare(password, user.password)

    if(matchpassword){
      const accessToken = jwt.sign({
        name:user.name,
        role:user.role
      }, AccessToken, {expiresIn:"1h"})

      const refreshToken = jwt.sign({
        name:user.name,
        role:user.role
      }, RefreshToken)

      return res.status(200).json({accessToken, refreshToken, name: user.name, role:user.role, email:user.email})
    }
    else{
      return res.status(400).json({message:"Password is Incorrect"})
    }

  }
  catch (error) {
    console.log("ERROR WHILE LOGIN", error)
    return res.status(500).json({message:"ERROR WHILE LOGIN"})
  }
}