import UserRegisterSchema from "../Models/userRegisterSchema.js"
import bcrypt from "bcryptjs"

// ---------------------STUDENT REGISTRATION ---------------------------------

export const studentRegister = async(req, res) => {
  const {name, email, password, role } = req.body

  if(role !== "Student"){
    return res.status(400).json({message:"Error While Registering. Try again later"})
  }
  
  try {

    const emailExist = await UserRegisterSchema.findOne({email})
    if(emailExist){
      return res.status(400).json({message:"Email already Exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserRegisterSchema({
      name, 
      email, 
      password:hashedPassword, 
      role
      })

    await newUser.save()
    res.status(200).json({message:"Successfully Registered"})
    
  } 
  catch (error) {
    console.error("Error while saving userRegister Details", error)
    return res.status(500).json({message:"Error while Registering Student Details"})
  }
}

// --------------------- CONSULTANT REGISTRATION ---------------------------------

export const consultantRegister = async(req, res) => {
  const {name, email, password, role } = req.body

  if(role !== "Consultant"){
    return res.status(400).json({message:"Error While Registering. Try again later"})
  }
  try {

    const emailExist = await UserRegisterSchema.findOne({email})
    if(emailExist){
      return res.status(400).json({message:"Email already Exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserRegisterSchema({
      name, 
      email, 
      password:hashedPassword, 
      role, 
      })

    await newUser.save()
    res.status(200).json({message:"Successfully Registered"})

  } catch (error) {
    console.error("Error while saving userRegister Details", error)
    return res.status(500).json({message:"Error while Registering Student Details"})
  }
}