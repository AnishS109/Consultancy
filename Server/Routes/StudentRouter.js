import express from "express"
import { fetchingConsultants } from "../Controllers/Student/consultantController.js"
import { StudentImageupload, UploadProfileImage, fetchProfile, getImage, updateProfile } from "../Controllers/Student/profileController.js"
import uploadImg from "../utils/uploadImg.js"

const StudentRouter = express.Router()

StudentRouter.use(express.urlencoded({ extended:true }))
StudentRouter.use(express.json())

StudentRouter.get("/fetching-consultants", fetchingConsultants)

StudentRouter.post("/Updating/Student/Profile", updateProfile)
StudentRouter.get("/Fetching/Student/Profile", fetchProfile)

StudentRouter.post("/Profle-Image-Upload-Database", uploadImg.single("file") ,UploadProfileImage )
StudentRouter.post("/Image-Saved-to-Student" , StudentImageupload)
StudentRouter.get("/file/:filename" , getImage)

export default StudentRouter;
