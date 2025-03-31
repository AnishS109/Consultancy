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
  },
  studentDegreeInterested: {
    type: [String],
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
  },
  studentCountryInterested: {
    type: [String],
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

  consultProfilePhoto1: {
    type:String
  },
  consultProfilePhoto2: {
    type:String
  },
  consultProfilePhoto3: {
    type:String
  },
  consultDOB: {
    type:Date
  },
  consultGender:{
    type:String
  },
  consultAddress:{
    type:String
  },
  consultCountry:{
    type:String
  },
  consultPostalCode:{
    type:Number
  },
  consultCollegeID:{
    type:String
  },
  consultCollegeName:{
    type:String
  },
  consultUniversityName:{
    type:String
  },
  consultCollegeMajor:{
    type:String
  },
  consultAdmissionDate:{
    type:Date
  },
  consultExamsGiven:{
    type:[String]
  },
  consultSemFees:{
    type:Number
  },
  consultMonthlyExpenses:{
    type:Number
  },
  consultBankLoan:{
    type:Number
  },
  consultBankAccNumber:{
    type:Number
  },
  consultBankAccHolderName:{
    type:String
  },
  consultBankIANnumber:{
    type:Number
  },
  consultBankSwiftCode:{
    type:String
  },
  consultPhoneNumber:{
    type:String
  },
  consultLinkedin:{
    type:String
  },
  consultYT:{
    type:String
  },
  consultInstagram:{
    type:String
  },
  consultGitHub:{
    type:String
  },
  consultAbout:{
    type:String
  },
  consultDescription:{
    type:String
  },
  underVerification: {
    type:Boolean,
    default:false
  },
  isVerified: {
    type:Boolean,
    default:false
  }
},{
  timestamps:true
});

const StudentConsultSchema = new mongoose.model("UserDetails", userRegisterSchema);

export default StudentConsultSchema;
