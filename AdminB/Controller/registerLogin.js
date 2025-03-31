import UserSchema from "../Models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ------------------------- REGISTERING ADMIN ------------------------

export const userRegister = async(req, res) => {
    const { name, password, email, type } = req.body

    try {
        const user = await UserSchema.findOne({email})
        if(user){
            res.status(400).json({message:"Email already register!"})
        }

        const hashedPass = await bcrypt.hash(password,10)

        const newUser = new UserSchema({name,password:hashedPass,email,type})
        await newUser.save()

        res.status(200).json({message:"Admin Register Successfully"})

    } catch (error) {
        res.status(500).json({message:"Something went wrong. Try Later!"})
    }
}

// --------------------------- LOGIN ADMIN ----------------------------

export const userLogin = async(req, res) => {

    const { email, password } = req.body
    const Access_Token = process.env.ACCESS_TOKEN;
    const Refresh_Token = process.env.REFRESH_TOKEN;

    try {
      const user = await UserSchema.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        const accessToken = jwt.sign(
          {
            email: email,
          },
          Access_Token,
          { expiresIn: "24h" }
        );

        const refreshToken = jwt.sign(
          {
            email: email,
          },
          Refresh_Token
        );

        return res.status(200).json({
          accessToken,
          refreshToken,
          type:user.type,
          email: user.email,
          name: user.name,
          edit:user.edit,
          delete:user.delete
        });
      } else {
        return res.status(400).json({ message: "Password is Incorrect" });
      }
    } catch (error) {
      res.status(500).json({ message: "SOMETHING WENT WRONG" });
    }

}