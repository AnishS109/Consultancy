import StudentConsultScehma from "../../Models/studentConsultSchema.js"

// ----------------- FETCHING CONSULTANTS ----------------

export const fetchingConsultants = async(req, res) => {
  try {
    const consultants = await StudentConsultScehma.find({role:"Consultant",underVerification:true})

    return res.status(200).json(consultants)
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// ------------------ FETCHING CONSULTANT DATA ------------

export const fetchingConsultantData = async(req, res) => {
  const { id } = req.query

  try {
    const consult = await StudentConsultScehma.findOne({_id:id, underVerification:true})
    if(!consult){
      return res.status(404).json({message:"Consultant data not found"})
    }

    return res.status(200).json(consult)

  } catch (error) {
    return res.status(500).json({message:"Something went wrong! Try later."})
  }
}

// ------------------- DELETING CONSULTANT COLLEGE ID ---------------------

export const deleteCollegeID = async (req, res) => {

  const { email } = req.query;

  try {
    const user = await StudentConsultScehma.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Consultant Not Found" });
    }

    user.consultCollegeID = null; 
    user.underVerification = false;

    await user.save();

    res.status(200).json({ message: "College ID deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- PROFILE VERIFICATION -------------------------

export const profileVerification = async(req, res) => {
  const { isVerified, email } = req.body

  try {
    const user = await StudentConsultScehma.findOne({email})
    if(!user){
      return res.status(404).json({message:'Consultant Not found'})
    }

    user.isVerified = isVerified
    await user.save()
    return res.status(200).json({message:"Verification Updated Successfully"})
  } catch (error) {
    return res.status(500).json({message:"SOmething Went Wrong. Try Later!"})
  }
} 