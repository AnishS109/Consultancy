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