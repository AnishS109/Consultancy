import grid from "gridfs-stream"
import mongoose from "mongoose"
import UserRegisterSchema from "../../Models/userRegisterSchema.js";

// ----------------- DONWLOADING IMAGE FROM BACKEND --------------------------

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

    // console.log("File found:", file);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ msg: "SERVER ERROR" });
  }
};

// ----------------- SENDING IMAGE URL TO FRONT END --------------------------

export const UploadImage = (req,res) => {
  
  if(!req.file){
    return res.status(404).json({message:"Select an image to upload."})
  }

  const imageUrl = `${req.file.originalname}`

  return res.status(200).json(imageUrl)
}

// ----------------- SAVING PROFILE IMAGE 1 URL TO DATABASE  --------------------------

export const SavingConsultProfilePhoto1 = async(req,res) => {

  const {img,email} = req.body

  try {
    const userData = await UserRegisterSchema.findOne({email})
    userData.consultProfilePhoto1 = img
    userData.save()
    return res.status(200).json({message:"Image Uploaded Successfully"})
  } catch (error) {
    return res.status(500).json({message:"Error While Uploading Image! Try Again Later."})
  }
}

// ----------------- SAVING PROFILE IMAGE 2 URL TO DATABASE  --------------------------

export const SavingConsultProfilePhoto2 = async(req,res) => {

  const {img,email} = req.body

  try {
    const userData = await UserRegisterSchema.findOne({email})
    userData.consultProfilePhoto2 = img
    userData.save()
    return res.status(200).json({message:"Image Uploaded Successfully"})
  } catch (error) {
    return res.status(500).json({message:"Error While Uploading Image! Try Again Later."})
  }
}

// ----------------- SAVING PROFILE IMAGE 3 URL TO DATABASE  --------------------------

export const SavingConsultProfilePhoto3 = async(req,res) => {

  const {img,email} = req.body

  try {
    const userData = await UserRegisterSchema.findOne({email})
    userData.consultProfilePhoto3 = img
    userData.save()
    return res.status(200).json({message:"Image Uploaded Successfully"})
  } catch (error) {
    return res.status(500).json({message:"Error While Uploading Image! Try Again Later."})
  }
}
// ----------------- SAVING COLLEGE ID URL TO DATABASE  --------------------------

export const SavingConsultCollegeIDphoto = async(req,res) => {

  const {img,email} = req.body

  try {
    const userData = await UserRegisterSchema.findOne({email})
    userData.consultCollegeID = img
    userData.save()
    return res.status(200).json({message:"College ID Uploaded Successfully"})
  } catch (error) {
    return res.status(500).json({message:"Error While Uploading College ID! Try Again Later."})
  }
}
