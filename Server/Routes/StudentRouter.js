import express from "express"
import { fetchingConsultants } from "../Controllers/Student/consultantController.js"

const StudentRouter = express.Router()

StudentRouter.use(express.urlencoded({ extended:true }))
StudentRouter.use(express.json())

StudentRouter.get("/fetching-consultants", fetchingConsultants)

export default StudentRouter;
