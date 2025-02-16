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

// --------------------- FETCHING DATA FOR PROFILE SECTION ----------------

export const fetchingDataForProfileScetion = async(req, res) => {
  const { id } = req.query

  try {
    const data = await UserRegisterSchema.findOne({_id:id})

    if(!data){
      return res.status(404).json({message:"Consultant accout may deleted or disabled"})
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({message:"Something went wrong! Try again later"})
  }
}