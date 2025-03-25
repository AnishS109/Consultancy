import Express from "express";
import env from "dotenv"
import cors from 'cors'

env.config()

const app = Express()

const StartServer = () => {

  app.use(cors())

  const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
}

StartServer()