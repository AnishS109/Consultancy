import mongoose from "mongoose";

const DBConnection = async() => {

  const URl = process.env.DB_URL

  try{
    await mongoose.connect(URl)
    console.log("Connected to the Database")
  }
  catch(error)
  {
    console.log("Error While Connecting to the Database",error)
  }
}

export default DBConnection;