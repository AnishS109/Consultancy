import UserSchema from "../../Models/userSchema.js"
import userSchema from "../../Models/userSchema.js"

import bcrypt from "bcryptjs"
import { sendEmail } from "../../Utils/emailService.js"

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
    const { id, edit, deletePermission } = req.body;
    
    if (!id) {
        return res.status(400).json({ message: "Admin ID is required" });
    }

    // Find and update the admin's permissions
    const updatedAdmin = await userSchema.findByIdAndUpdate(
        id,
        { edit, deletePermission },
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

// ---------------------- MAIL FORMAT -----------------------------

const mailSender = async (name, email, password) => {
  try {
    const mailmessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background: linear-gradient(135deg, #f9f9f9, #ffffff); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #4CAF50; font-size: 28px; margin-bottom: 10px;">
        🚀 Grookit - Welcome to your consultancy platform
      </h2>
      <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 20px;">
        Expert Solutions for Your Business Needs.
      </p>
      <p style="font-size: 16px; color: #333;">
        Hello ${name}, 👋
      </p>
      <p style="font-size: 16px; color: #333;">
        Welcome to <strong>Grookit</strong>, your trusted consultancy platform. We're excited to have you onboard. Here are your account details:
      </p>
      <div style="margin: 20px 0;">
        <strong>Email:</strong> <span style="color: #333;">${email}</span>
      </div>
      <div style="margin-bottom: 30px;">
        <strong>Password:</strong> <span style="color: #333;">${password}</span> (Make sure to keep it secure!)
      </div>
      <p style="font-size: 16px; color: #333;">
        We recommend changing your password after your first login to enhance security.
      </p>
      <p style="font-size: 16px; color: #333;">
        At Grookit, we offer expert consultancy services to help drive your business forward. If you need any assistance, feel free to reach out to our team.
      </p>
      <p style="font-size: 16px; color: #333;">
        Best regards,<br/>
        <strong>Team Grookit</strong> 🚀
      </p>
      <footer style="text-align: center; font-size: 14px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        Need help? Contact us at <a href="mailto:support@grookit.com" style="color: #4CAF50; text-decoration: none;">support@grookit.com</a>.
      </footer>
    </div>`;

    await sendEmail(email, "Welcome to Grookit - Your Account Details", mailmessage);
  } catch (error) {
    // console.error('Error sending Grookit account information email:', error);
  }
};


// ---------------------- CREATING ADMINS ------------------------

export const addAdmins = async(req, res) => {
  const { name, email, password, edit, deletePermission, type } = req.body

  try {
    const isUserExist = await UserSchema.findOne({email})
    if(isUserExist){
      return res.status(400).json({message:"Admin already registered"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new UserSchema({
      name, email, password:hashedPassword, edit, deletePermission, type
    })

    await newUser.save()
    await mailSender(name,email,password)
    return res.status(201).json({message:"Admin Created Successfully"})
  } catch (error) {
    // console.log("ERROR WHILE CREATING ADMIN", error);
    return res.status(500).json({message:"Server Error! Try again later."})
  }
}

// ------------------------ SUB_ADMIN PASSWORD CHANGE ----------------------------

export const changePass = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await userSchema.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found."})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword

    await user.save()
    return res.status(200).json({message:"Password Changed Succesfully"})
  } catch (error) {
    return res.status(500).json({message:"Server error! Try again later."})
  }
}