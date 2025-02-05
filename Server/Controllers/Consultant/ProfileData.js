import UserRegisterSchema from "../../Models/userRegisterSchema.js"

// ---------------------- FETCHING PROFILE DATA ----------------------

export const fetchProfileData = async(req, res) => {
  const { email, role } = req.query

  try {
    const user = await UserRegisterSchema.findOne({email, role})

    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message:"Error While fetching the data"})
  }
}

// --------------------- UPDATING PROFILE DATA ----------------------

export const updatingProfileData = async(req, res) => {

  const {email, role, name, univerityName, collegeName, countryName, degreeName, consultImage, 
    consultPhoneNumber, consultSkills, consultLinkedinUrl, consultExperienceYears, consultDescription, consultAbout} = req.body

  try {
  const userData = await UserRegisterSchema.findOne({email,role})

  userData.name = name
  userData.univerityName = univerityName
  userData.collegeName = collegeName
  userData.countryName = countryName
  userData.consultImage = consultImage
  userData.degreeName = degreeName
  userData.consultPhoneNumber = consultPhoneNumber
  userData.consultSkills = consultSkills
  userData.consultLinkedinUrl = consultLinkedinUrl
  userData.consultExperienceYears = consultExperienceYears 
  userData.consultDescription = consultDescription
  userData.consultAbout = consultAbout
  
  await userData.save()
  res.status(200).json({message:"Profile Updated Successfully"})

  } 
  catch (error) {
  return res.status(500).json({message:"Error while updating Profile"})
  }
}