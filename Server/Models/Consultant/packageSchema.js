import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  Package1Title: { type: String },
  Package1Price: { type: String },
  Package1Time: { type: String },
  Package1Description: { type: String },

  Package2Title: { type: String },
  Package2Price: { type: String },
  Package2Time: { type: String },
  Package2Description: { type: String },

  Package3Title: { type: String },
  Package3Price: { type: String },
  Package3Time: { type: String },
  Package3Description: { type: String },

  Package4Title: { type: String },
  Package4Price: { type: String },
  Package4Time: { type: String },
  Package4Description: { type: String },

  PriorityDMTitle: { type: String },
  PriorityDMPrice: { type: String },
  PriorityDMTime: { type: String },
  PriorityDMDescription: { type: String },

  email: { type: String },  
  name: { type: String }
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

export default Package;
