import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { NavLink } from 'react-router-dom';

const Login = () => {

// -------------------- USESTATES ----------------------

  const [login,setLogin] = useState({
    email:"",
    password:""
  })
  const [showPassword, setShowPassword] = useState(false);

// ----------------- HANDLE CHANGING -------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setLogin({...login, [name]:value})
  }

// ----------------- HANDLE SUBMIT -------------------

const handleSubmit = () => {
  console.log(login)
}

  return (
<>
{/* ----------------------- BACKGROUND -------------------------- */}

<Box className="h-screen w-screen bg-[#f5f0e0] flex items-center justify-center">

{/* --------------------- MAIN LOGIN BOX ------------------- */}

<Box className="h-fit w-[400px] bg-white rounded-3xl text-center py-12 px-8 border-gray-300 border-2">

<Typography className='text-black text-2xl font-bold'>
  Login your Account
</Typography>

<TextField
type="email"
value={login.email}
onChange={handleChange}
fullWidth
label="Email"
required
placeholder="Enter your email"
variant="outlined"
name="email"
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
  value={login.password}
  onChange={handleChange}
  type={showPassword ? "text" : "password"}
  fullWidth
  required
  placeholder="Enter your password"
  variant="outlined"
  label="Password"
  name="password"
  className="mt-6"
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

{/* -------------------- LOGIN BUTTON ------------------------- */}

<Button
onClick={handleSubmit}
variant="contained"
disabled={!login.email || !login.password}
className="text-white font-bold bg-black normal-case w-full rounded-[6px] h-10 mt-8">
  Login
</Button>

<NavLink to={"/ForgotPassword"}>
<Typography className="text-[#008060] font-bold mt-8 text-[13px] sm:text-[17px] hover:underline">
  Forgot Password
</Typography>
</NavLink>

<NavLink to={"/Register"}>
<Typography className="text-[#008060] font-bold mt-3 text-[13px] sm:text-[17px] hover:underline">
  Register New Account
</Typography>
</NavLink>

</Box>
  
</Box>
</>
  )
}

export default Login
