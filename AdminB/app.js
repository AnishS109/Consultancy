import Express from "express";
import env from "dotenv"
import cors from 'cors'
import Router from "./Routes/Router.js";
import DatabaseConnection from "./Database/Database.js";
import MainAdminsRouter from "./Routes/MainAdmins.js";

env.config()

const app = Express()

const StartServer = () => {

  app.use(cors())

  app.use("/", Router)
  app.use("/MainAdmin", MainAdminsRouter)

  const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
  DatabaseConnection()
}

StartServer()