import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import axios from "axios";

import SignInImage from "../assets/SignInBack.svg"
import googleImg from "../assets/google.svg"
import LinkedinImg from "../assets/linkedin.svg"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Login = () => {

  const {backendUrl, setAccount} = useContext(DataContext)

// ---------------------------------------------------------------------------

  const [loading, setLoading] = useState(false) 
  const [errorMsg,setErrorMsg] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate()

// ---------------------------------------------------------------------------

  const [formdata, setFormData] = useState({
    email:"",
    password:"",
  })
  
// ---------------------------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formdata, [name]:value})
  }
  
// ---------------------------------------------------------------------------
  
  useEffect(() => {
    setErrorMsg("")
  },[formdata])
  
// ---------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formdata.email)) {
      setLoading(false);
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    
    if(formdata.password.length < 8){
      setLoading(false)
      setErrorMsg("Enter valid password")
      return
    }

    try {
        const response = await axios.post(`${backendUrl}/login`, formdata)

      if(response.status === 200){
          setAccount(response.data)
        if(response.data.role === "Student"){
          navigate("/Student/Home")
        }else if(response.data.role === "Consultant"){
            navigate("/Consultant/Home")
        }
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Error in Login, Please try again Later")
    } finally {
        setLoading(false)
    }
  }
  
// ---------------------------------------------------------------------------

const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
// ---------------------------------------------------------------------------

  return (
    <>
    <Box className="flex justify-between">

{/* ------------------------------------------------------------------------------------- */}

  <Box className="w-[700px] h-screen pl-2 sm:pl-28 md:pl-40 pr-10">

{/* ------------------------------------------------------------------------------------- */}

  <Box className="flex justify-between h-16 items-center">

  <Typography className="text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem] font-bold">Logo IDA </Typography>
    
  <Box 
  className="text-black mt-4 text-[13px] sm:text-[17px] text-nowrap normal-case h-10 mr-5 sm:mr-10 border-black font-semibold transition-all">
    SignUp as <NavLink to={"/Student/Register"}><span className="text-[10px] sm:text-[15px] underline text-gray-400 text-sm hover:text-black cursor-pointer">Student</span></NavLink> or <NavLink to={"/Consultant/Register"}><span className="text-[10px] sm:text-[15px] underline text-gray-400 text-sm hover:text-black cursor-pointer">Consultant</span></NavLink>
  </Box>


  </Box>

  <Box className="w-screen border-b-[1px] h-2 sm:ml-[-160px]"></Box>

{/* ------------------------------------------------------------------------------------- */}

    <Box className="mt-6 sm:mt-10">
      
      <Box>
      <Typography className="text-[1.2rem] tracking-tight sm:text-[1.3rem] md:text-[2.5rem] text-gray-700 font-bold">
        Sign In
      </Typography>
      </Box>
      
      <Box className="flex flex-wrap justify-between sm:gap-4 mr-4 p-4 mt-5">
      <Button 
      variant="outlined"
      className="flex normal-case h-10 items-center gap-2 border-2 border-black w-full sm:w-fit p-3 rounded-[8px] cursor-pointer">
        <img
        className="h-6" 
        src={googleImg} alt="Google img"/>
        <Typography 
        className="text-gray-700 text-xs text-nowrap">
          Continue with <span className="font-bold">Google</span>
        </Typography>
      </Button>

      <Button 
      variant="outlined"
      className="flex normal-case mt-3 sm:mt-0 h-10 items-center gap-2 border-2 border-black w-full sm:w-fit p-3 rounded-[8px] cursor-pointer">
        <img
        className="h-6" 
        src={LinkedinImg} alt="linkedIn img"/>
        <Typography 
        className="text-gray-700 text-xs text-nowrap">
          Continue with <span className="font-bold">LinkedIn</span>
        </Typography>
      </Button>
      </Box>

      <Box className="border-b-[1px] h-1 mt-6 mr-4"></Box>

      {errorMsg && (
        <Typography className="text-red-600 font-bold text-center mt-2 bg-red-100 p-[3px] rounded-[6px]">
          {errorMsg}
        </Typography>
      )}

{/* ------------------------------------------------------------------------------------- */}
   
    <Box className="flex-col gap-3 flex-wrap items-center justify-center mt-4">
    
    <Box className="mr-4">
    <Typography className="text-black font-semibold mb-2">Email</Typography>
    <TextField
    type="email"
    value={formdata.email}
    onChange={handleChange}
    fullWidth
    required
    placeholder="Enter your email"
    variant="outlined"
    name="email"
    className="mb-5 bg-gray-100 rounded-lg"
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
    </Box>
    
    <Box className="mr-4">
    <Typography className="text-black font-semibold mb-2">Password</Typography>
    <TextField
    value={formdata.password}
    onChange={handleChange}
    type={showPassword ? "text" : "password"}
    fullWidth
    required
    placeholder="Enter your password"
    variant="outlined"
    name="password"
    className="mb-5 bg-gray-100 rounded-lg"
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
          <IconButton onClick={togglePasswordVisibility} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    />
    </Box>
    
    <Box className="mr-4">
    {loading ? (
    <Box className="flex items-center justify-center">
      <CircularProgress className="text-black"/>
    </Box>
    ) : (
      <Button
      onClick={handleSubmit}
      variant="contained"
      disabled={!formdata.email || !formdata.password}
      className="text-white font-bold bg-black normal-case w-full rounded-[6px] h-10">
        Login
      </Button>
    )}
    </Box>
    
    <Box className="mr-20">
      <NavLink to={"/ForgotPassword"}>
      <Typography className="text-[#008060] font-bold mt-3 text-[13px] sm:text-[17px] hover:underline w-fit">
        Forgot Password
      </Typography>
      </NavLink>
    </Box>

     </Box>

    </Box>

  </Box>

{/* ------------------------------------------------------------------------------------- */}
        <img 
        className="h-screen hidden md:block md:w-[42vw]"
        src={SignInImage} alt="Image" />

      </Box>
    </>
  )
}

export default Login