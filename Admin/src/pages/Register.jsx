import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Register = () => {

  const unique = "9098"

// ---------------------- USE STATES -------------------------

  const [showPassword, setShowPassword] = useState(false)
  const [register, setRegister] = useState({
    name:"",
    email:"",
    password:"",
    code:"",
    type:""
  })

// ---------------------- HANDLE CHANGE ---------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegister({...register,[name]:value})
  }

// --------------------- HANDLE SUBMIT ----------------------

  const handleSubmit = () => {
    const newType = register.code == unique ? "Main-Admin" : "Admin";

    setRegister((prev) => ({
      ...prev,
      type: newType
    }));

    setTimeout(() => {
      console.log(register);
    }, 0);
  };

  return (
<>
{/* -------------------------- BACKGROUND ---------------------------- */}

<Box className="h-screen w-screen bg-[#f5f0e0] flex items-center justify-center">

{/* ----------------------- MAIN REGISTER BOX ------------------- */}

<Box className="h-fit w-[400px] bg-white rounded-3xl text-center py-12 px-8 border-gray-300 border-2">

<Typography className='text-black text-2xl font-bold'>
  Register your Account
</Typography>

<TextField
type="text"
value={register.name}
onChange={handleChange}
fullWidth
label="Name"
required
placeholder="Enter your name"
variant="outlined"
name="name"
className="mt-8"
sx={{
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black", 
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", 
  },
}} />

<TextField
type="email"
value={register.email}
onChange={handleChange}
fullWidth
label="Email"
required
placeholder="Enter your email"
variant="outlined"
name="email"
className="mt-4"
sx={{
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black", 
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", 
  },
}} />

<TextField
type="number"
value={register.code}
onChange={handleChange}
fullWidth
label="Code (Optional)"
required
placeholder="Enter Code here (Optional)"
variant="outlined"
name="code"
className="mt-4"
sx={{
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black", 
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", 
  },
}} />

<TextField
value={register.password}
onChange={handleChange}
type={showPassword ? "text" : "password"}
fullWidth
required
placeholder="Enter your password"
variant="outlined"
label="Password"
name="password"
className="mt-4"
sx={{
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
}}
InputProps={{
  endAdornment: (
    <InputAdornment position="end">
      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  ),
}}
/>

{/* ----------------------- SUBMIT BUTTON ----------------------- */}

<Button
onClick={handleSubmit}
variant="contained"
disabled={!register.email || !register.password || !register.name}
className="text-white font-bold bg-black normal-case w-full rounded-[6px] h-10 mt-8">
  Login
</Button>

<NavLink to={"/"}>
<Typography className="text-[#008060] font-bold mt-6 text-[13px] sm:text-[17px] hover:underline">
  Click here to Login
</Typography>
</NavLink>

</Box>

</Box>
</>
  )
}

export default Register
