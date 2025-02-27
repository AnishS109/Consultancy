import UserRegisterSchema from "../../Models/userRegisterSchema.js"

// ---------------------- FETCHING PROFILE DATA ----------------------

export const fetchProfileData = async(req, res) => {

  const { email } = req.query

  try {
    const user = await UserRegisterSchema.findOne({email})

    if(!user){
      return res.status(404).json({message:"Consultant account may deleted or disabled"})
    }

    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message:"Error While fetching the data"})
  }
}

// --------------------- UPDATING PROFILE DATA ----------------------

export const updatingProfileData = async(req, res) => {

  const {email, name, consultDOB, consultGender, consultAddress, consultCountry, consultPostalCode, consultCollegeName, consultUniversityName, consultCollegeMajor, consultAdmissionDate, consultExamsGiven, consultSemFees, consultMonthlyExpenses, consultBankLoan, consultBankAccNumber, consultBankAccHolderName, consultBankIANnumber, consultBankSwiftCode, consultPhoneNumber, consultLinkedin, consultYT, consultInstagram, consultGitHub, consultAbout, consultDescription} = req.body

  try {
  const userData = await UserRegisterSchema.findOne({email})

  userData.name = name
  userData.consultDOB = consultDOB
  userData.consultGender = consultGender
  userData.consultAddress = consultAddress
  userData.consultCountry = consultCountry
  userData.consultPostalCode = consultPostalCode
  userData.consultCollegeName = consultCollegeName
  userData.consultUniversityName = consultUniversityName
  userData.consultCollegeMajor = consultCollegeMajor
  userData.consultAdmissionDate = consultAdmissionDate
  userData.consultExamsGiven = consultExamsGiven
  userData.consultSemFees = consultSemFees
  userData.consultMonthlyExpenses = consultMonthlyExpenses
  userData.consultBankLoan = consultBankLoan
  userData.consultBankAccNumber = consultBankAccNumber
  userData.consultBankAccHolderName = consultBankAccHolderName
  userData.consultBankIANnumber = consultBankIANnumber
  userData.consultBankSwiftCode = consultBankSwiftCode
  userData.consultPhoneNumber = consultPhoneNumber
  userData.consultLinkedin = consultLinkedin
  userData.consultYT = consultYT
  userData.consultInstagram = consultInstagram
  userData.consultGitHub = consultGitHub
  userData.consultAbout = consultAbout
  userData.consultDescription = consultDescription
  
  await userData.save()
  res.status(200).json({message:"Profile Updated Successfully"})

  } 
  catch (error) {
    console.log(error);
  return res.status(500).json({message:"Error While Updating Profile"})
  }
}

// --------------------- FETCHING DATA FOR PROFILE SECTION ----------------

export const fetchingDataForProfileScetion = async(req, res) => {
  
  const { id } = req.query

  try {
    const data = await UserRegisterSchema.findOne({_id:id})

    if(!data){
      return res.status(404).json({message:"Consultant account may deleted or disabled"})
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({message:"Something went wrong! Try again later"})
  }
}