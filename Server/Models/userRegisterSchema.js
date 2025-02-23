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
  

// ----------  STUDENT ---------------

  studentDOB: {
    type: Date,
  },
  studentGender: {
    type: String,
  },
  studentPhoto: {
    type: String,
  },
  studentNumber: {
    type: String,
  },
  studentAddress: {
    type: String,
  },
  studentExamsTaken: {
    type: [String],
    default:[]
  },
  studentDegreeInterested: {
    type: [String],
    default:[]
  },
  studentfather: {
    type: String,
  },
  studentMother: {
    type: String,
  },
  studentFatherOccu: {
    type: String,
  },
  studentCollegeInterested: {
    type: [String],
    default: [], 
  },
  studentCountryInterested: {
    type: [String],
    default: [], 
  },
  studentSchoolName:{
    type: String
  },
  studentGraduateCollegeName:{
    type: String
  },
  studentGraduateCollegeDegreeName:{
    type: String
  },
  studentGraduateCollegeSpecialisation:{
    type: String
  },
  studentGraduateCollegeYear:{
    type: String
  },
  studentPostCollegeName:{
    type: String
  },
  studentPostCollegeDegreeName:{
    type: String
  },
  studentPostCollegeSpecialisation:{
    type: String
  },

// --------------- CONSULT -------------------

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
