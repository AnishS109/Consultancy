import express from "express"
import { consultantRegister, studentRegister } from "../Controllers/Register.js"
import { userLogin } from "../Controllers/Login.js"

const Router = express.Router()

Router.use(express.urlencoded({ extended:true }))
Router.use(express.json())

Router.post("/Student/Register", studentRegister)
Router.post("/Consultant/Register", consultantRegister)
Router.post("/login", userLogin)


export default Router