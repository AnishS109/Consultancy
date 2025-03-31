import express from "express"
import { adminVerification, fetchAvailability, fetchProfileData, fetchProfilePhoto, fetchingDataForProfileScetion, updatingProfileData } from "../Controllers/Consultant/ProfileData.js"
import uploadImg from "../utils/uploadImg.js"
import { getImage, SavingConsultCollegeIDphoto, SavingConsultProfilePhoto1, SavingConsultProfilePhoto2, SavingConsultProfilePhoto3, UploadImage } from "../Controllers/Consultant/ImageController.js"
import { AddingTimings, FetchingTimings, deletingTimeData } from "../Controllers/Consultant/Availability.js"
import {addPackageDetails, fetchPackages, fetchPackagesById} from "../Controllers/Consultant/Package.js"

const ConsultRouter = express.Router()

ConsultRouter.use(express.urlencoded({ extended:true }))
ConsultRouter.use(express.json())

ConsultRouter.get("/Fetch-Profile-Data", fetchProfileData)
ConsultRouter.post("/Updating-Profile-Data", updatingProfileData)

ConsultRouter.post("/Consult-Image-Upload",uploadImg.single("file"), UploadImage);
ConsultRouter.get("/file/:filename", getImage)

ConsultRouter.post("/Consult-Profile-Photo1", SavingConsultProfilePhoto1);
ConsultRouter.post("/Consult-Profile-Photo2", SavingConsultProfilePhoto2);
ConsultRouter.post("/Consult-Profile-Photo3", SavingConsultProfilePhoto3);
ConsultRouter.post("/Consult-College-ID-Photo", SavingConsultCollegeIDphoto);

ConsultRouter.get("/Consult-Home-Profile-Section", fetchingDataForProfileScetion)

ConsultRouter.post("/Adding-Availability", AddingTimings)
ConsultRouter.get("/Fetching-Availability-Timing", FetchingTimings)
ConsultRouter.delete("/Delete-Availability-Timing", deletingTimeData)

ConsultRouter.post("/Adding-Package-Details", addPackageDetails)
ConsultRouter.get("/Fetching-Package-Details", fetchPackages)
ConsultRouter.get("/Fetching-Package-Details-By-ID", fetchPackagesById)

ConsultRouter.get("/Fetching-Profile-Photo", fetchProfilePhoto)
ConsultRouter.get("/Fetching-Availability", fetchAvailability)

ConsultRouter.post("/Admin-Verification", adminVerification)


export default ConsultRouter