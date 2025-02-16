import express from "express"
import { fetchProfileData, fetchingDataForProfileScetion, updatingProfileData } from "../Controllers/Consultant/ProfileData.js"
import uploadImg from "../utils/uploadImg.js"
import { getImage, SavingConsultCollegeIdImage, SavingConsultImage, UploadImage } from "../Controllers/Consultant/ImageController.js"

const ConsultRouter = express.Router()

ConsultRouter.use(express.urlencoded({ extended:true }))
ConsultRouter.use(express.json())

ConsultRouter.get("/Fetch-Profile-Data", fetchProfileData)
ConsultRouter.post("/Updating-Profile-Data", updatingProfileData)

ConsultRouter.post("/Consult-profile-Image",uploadImg.single("file"), UploadImage);
ConsultRouter.post("/Consult-Profile-image-Data-Save", SavingConsultImage);
ConsultRouter.post("/Consult-College-ID-image-Data-Save", SavingConsultCollegeIdImage);
ConsultRouter.get("/file/:filename", getImage)

ConsultRouter.get("/Consult-Home-Profile-Section", fetchingDataForProfileScetion)

export default ConsultRouter