import  Express  from "express";
import { UpdatingAdminPermissions, addAdmins, changePass, fetchingAdminPermissions, fetchingAdmins } from "../Controller/MainAdmin/subAdmins.js";
import { deleteCollegeID, fetchingConsultantData, fetchingConsultants, profileVerification } from "../Controller/MainAdmin/consultants.js";

const MainAdminsRouter = Express.Router()

MainAdminsRouter.get("/Fetching-All-Admins", fetchingAdmins)
MainAdminsRouter.get("/Fetching-Admins-Permissions", fetchingAdminPermissions)
MainAdminsRouter.put("/Update-Admins-Permissions", UpdatingAdminPermissions)
MainAdminsRouter.post("/Add-Admin", addAdmins)
MainAdminsRouter.post("/Change-Password", changePass)

MainAdminsRouter.get("/Fetching-Consultants", fetchingConsultants)
MainAdminsRouter.get("/Fetching-Consultant-Data", fetchingConsultantData)

MainAdminsRouter.delete("/Delete-College-Id", deleteCollegeID)
MainAdminsRouter.post("/Profile-Verification", profileVerification)

export default MainAdminsRouter