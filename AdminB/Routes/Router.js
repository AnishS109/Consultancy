import Express from "express"

const Router = Express.Router()

Router.use(Express.urlencoded({ extended: true }))
Router.use(Express.json())

export default Router