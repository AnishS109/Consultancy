import mongoose from "mongoose";

// Combined user registration schema
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
  username: {
    type: String,
  },
  country: {
    type: String,
  },
  university: {
    type: String,
  },
  courseMajor: {
    type: String,
  },
  examDetails: {
    type: String,
  },
  degree: {
    type: String, // This will apply only to students, so can be left null for consultants if needed
  },
  preferredCountry: {
    type: String, // This can apply to both, though more relevant for students
  },
  preferredCourse: {
    type: String, // Again, relevant mainly for students
  },
  preferredUniversity: {
    type: String, // Same as above
  },
  role: {
    type: String, // Same as above
  }
});

// Create a model based on the above schema
const UserRegisterSchema = new mongoose.model("UserDetails", userRegisterSchema);

export default UserRegisterSchema;
