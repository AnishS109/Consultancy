import  Express  from "express";
import { UpdatingAdminPermissions, fetchingAdminPermissions, fetchingAdmins } from "../Controller/MainAdmin/subAdmins.js";
import { fetchingConsultantData, fetchingConsultants } from "../Controller/MainAdmin/consultants.js";

const MainAdminsRouter = Express.Router()

MainAdminsRouter.get("/Fetching-All-Admins", fetchingAdmins)
MainAdminsRouter.get("/Fetching-Admins-Permissions", fetchingAdminPermissions)
MainAdminsRouter.put("/Update-Admins-Permissions", UpdatingAdminPermissions)

MainAdminsRouter.get("/Fetching-Consultants", fetchingConsultants)
MainAdminsRouter.get("/Fetching-Consultant-Data", fetchingConsultantData)

export default MainAdminsRouter