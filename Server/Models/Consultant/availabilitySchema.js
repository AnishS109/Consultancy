import mongoose from "mongoose"

const available = mongoose.Schema({
  email:{
    type:String
  },
  Availability: {
    Monday: [{ type: String }],   
    Tuesday: [{ type: String }],
    Wednesday: [{ type: String }],
    Thursday: [{ type: String }],
    Friday: [{ type: String }],
    Saturday: [{ type: String }],
    Sunday: [{ type: String }],
  }
},{
  timestamps:true
})

const availabilitySchema = mongoose.model("availability",available)
export default availabilitySchema;