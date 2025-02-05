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
  },
  univerityName: {
    type:String
  },
  collegeName: {
    type:String
  },
  countryName: {
    type:String
  },
  degreeName: {
    type:String
  },
  consultPhoneNumber:{
    type:String
  },
  consultImage:{
    type:String
  },
  consultIdImage:{
    type:String
  },
  consultSkills:{
    type:String
  },
  consultLinkedinUrl:{
    type:String
  },
  consultExperienceYears:{
    type:Number
  },
  consultDescription:{
    type:String
  },
  consultAbout:{
    type:String
  },
});

const UserRegisterSchema = new mongoose.model("UserDetails", userRegisterSchema);

export default UserRegisterSchema;
