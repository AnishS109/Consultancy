import Express from "express"
import { userLogin, userRegister } from "../Controller/registerLogin.js"

const Router = Express.Router()

Router.use(Express.urlencoded({ extended: true }))
Router.use(Express.json())

Router.post("/Register", userRegister)
Router.post("/Login", userLogin)

export default Router