import userSchema from "../../Models/userSchema.js"

// ------------------ FETCHING ALL SUB ADMINS --------------------

export const fetchingAdmins = async(req, res) => {
  try {
    const admins = await userSchema.find({type:false})
    if(!admins){
      return res.status(404).json({message:"No Admins Found"})
    }

    return res.status(200).json(admins)
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// ---------------- FETCHING ADMIN PERMISSIONS ------------------

export const fetchingAdminPermissions = async(req, res) => {
  const { id } = req.query
  try {
    const admin = await userSchema.findOne({_id:id})
    if(!admin){
      return res.status(404).json({message:"No Admin Data Found"})
    }

    return res.status(200).json((admin))
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Later"})
  }
}

// --------------- UPDATING ADMIN PERMISSIONS ----------------

export const UpdatingAdminPermissions = async(req, res) => {
  try {
    const { id, edit, delete: deletePermission } = req.body;
    
    if (!id) {
        return res.status(400).json({ message: "Admin ID is required" });
    }

    // Find and update the admin's permissions
    const updatedAdmin = await userSchema.findByIdAndUpdate(
        id,
        { edit, delete: deletePermission },
        { new: true }
    );

    if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Permission updated successfully", admin: updatedAdmin });
} catch (error) {
    console.error("Error updating permissions:", error);
    res.status(500).json({ message: "Internal server error" });
}
}