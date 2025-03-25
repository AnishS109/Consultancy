import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  type:{
    type:String
  },
})

const UserSchema = new mongoose.model("UserDetails", userschema)

export default UserSchema