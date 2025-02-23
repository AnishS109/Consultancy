import UserRegisterSchema from "../../Models/userRegisterSchema.js";
import grid from "gridfs-stream"
import mongoose from "mongoose"

// --------------- UPDATING STUDENT PROFILE ------------------

export const updateProfile = async(req, res) => {
  const {email, _id} = req.body

  try {
    const user = await UserRegisterSchema.findOne({_id})
    if(!user){
      return res.status(404).json({message:"User not found! Try again later"})
    }

    const emailExist = await UserRegisterSchema.findOne({ email, _id: { $ne: _id } })
    if(emailExist){
      return res.status(400).json({message:"Email Already Exists!"})
    }
    
    user.email = email
    user.name = req.body.name
    user.studentDOB = req.body.studentDOB
    user.studentGender = req.body.studentGender
    user.studentPhoto = req.body.studentPhoto
    user.studentNumber = req.body.studentNumber
    user.studentAddress = req.body.studentAddress
    user.studentExamsTaken = req.body.studentExamsTaken
    user.studentDegreeInterested = req.body.studentDegreeInterested
    user.studentfather = req.body.studentfather
    user.studentMother = req.body.studentMother
    user.studentFatherOccu = req.body.studentFatherOccu
    user.studentCollegeInterested = req.body.studentCollegeInterested
    user.studentCountryInterested = req.body.studentCountryInterested
    user.studentSchoolName = req.body.studentSchoolName
    user.studentGraduateCollegeName = req.body.studentGraduateCollegeName
    user.studentGraduateCollegeDegreeName = req.body.studentGraduateCollegeDegreeName
    user.studentGraduateCollegeSpecialisation = req.body.studentGraduateCollegeSpecialisation
    user.studentGraduateCollegeSpecialisation = req.body.studentGraduateCollegeSpecialisation
    user.studentGraduateCollegeYear = req.body.studentGraduateCollegeYear
    user.studentPostCollegeName = req.body.studentPostCollegeName
    user.studentPostCollegeDegreeName = req.body.studentPostCollegeDegreeName
    user.studentPostCollegeSpecialisation = req.body.studentPostCollegeSpecialisation

    await user.save()
    return res.status(200).json({message:"Profile Updated Successfully"})
  } catch (error) {
    console.log("Error while updating profile:", error);
    return res.status(500).json({message:"Error While Updating Profile! Try Again Later"})
  }
}

// ---------------- FETCHING STUDENT PROFILE ----------------

export const fetchProfile = async(req, res) => {

  const { email } = req.query

  try {
    const user = await UserRegisterSchema.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found! Please Login Again"})
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// -------------- UPLOADING PROFILE IMAGE ------------------

export const UploadProfileImage = async(req, res) => {
  if(!req.file){
    return res.status(404).json({message:"Select an image to upload."})
  }

  const imageUrl = `${req.file.originalname}`

  return res.status(200).json(imageUrl)
}

// --------------- STUDENT IMAGE UPLOAD TO ITS PROFILE ------------------

export const StudentImageupload = async(req, res) => {

  const {email, img} = req.body


  try {
    const user = await UserRegisterSchema.findOne({email})

    user.studentPhoto = img
    await user.save()
    return  res.status(200).json({message:"Profile Image Change Successfully"})
  } catch (error) {
    return  res.status(500).json({message:"Error while changing Profile Image! Try again Later."})
  }
}

// ---------------- DONWLOADIN IMAGE FROM DATABASE -------------------------

let gfs,gridfsBucket
const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  })
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("photos")
})

export const getImage = async (req, res) => {
  // console.log("Requested filename:", req.params.filename);
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ msg: "Image not found" });
    }

    console.log("File found:", file);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ msg: "SERVER ERROR" });
  }
};
