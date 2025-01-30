import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String, 
  }
});

const UserRegisterSchema = new mongoose.model("UserDetails", userRegisterSchema);

export default UserRegisterSchema;
