import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import DBConnection from "./Database/database.js"

import Router from "./Routes/Router.js"

dotenv.config()

const app = express()

const StartServer = () => {

  app.use(cors())

  app.use("/", Router)

  const PORT = process.env.PORT_NUMBER
  app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
  })

DBConnection()
}

StartServer()