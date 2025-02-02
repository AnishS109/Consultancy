import UserRegisterSchema from "../../Models/userRegisterSchema.js"

export const fetchingConsultants = async(req,res) => {

  const role = "Consultant"

  try {
    const consultants = await UserRegisterSchema.find({role})

    return res.status(200).json(consultants)
  } catch (error) {
    return res.status(500).json({message:"Error While fetching Consultans"})
  }
}