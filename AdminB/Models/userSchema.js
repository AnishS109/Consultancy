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
    type:Boolean
  },
  edit:{
    type:Boolean,
    default:false
  },
  deletePermission:{
    type:Boolean,
    default:false
  },
})

const UserSchema = new mongoose.model("AdminDetails", userschema)

export default UserSchema