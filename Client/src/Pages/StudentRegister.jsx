import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { DataContext } from "../Context/DataProvider";

import SignUpImage from "../assets/SignUpImage.svg"
import googleImg from "../assets/google.svg"
import LinkedinImg from "../assets/linkedin.svg"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

  const StudentRegister = () => {

    const {backendUrl } = useContext(DataContext)
    
    // ---------------------------------------------------------------------------
    
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    // ---------------------------------------------------------------------------
    
    const [formdata, setFormData] = useState({
      name:"",
      email:"",
      password:"",
      role:"Student"
    })
    
    // ---------------------------------------------------------------------------

    useEffect(() => {
      setErrorMsg("")
    },[formdata])
    
    // ---------------------------------------------------------------------------

    const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({...formdata, [name]:value})
    }

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
        setErrorMsg("Password must be 8 character long.")
        return
      }

      try {
        const response = await axios.post(`${backendUrl}/Student/Register`, formdata)
        
        if(response.status === 200){
          setErrorMsg("")
          setTimeout(() => {
            navigate("/Login")
          },1000)
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || "Error While Registering, Please Try again later!")
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
    
    <NavLink to={"/Login"}>
    <Button 
    variant="outlined"
    className="text-black h-10 mr-10 border-black font-semibold hover:bg-black hover:text-white transition-all">
      Login
    </Button>
    </NavLink>

    </Box>

    <Box className="w-screen border-b-[1px] h-2 sm:ml-[-160px]"></Box>
{/* ------------------------------------------------------------------------------------- */}

    <Box className="mt-6 sm:mt-10">
      
      <Box>
      <Typography className="text-[1.2rem] tracking-tight sm:text-[1.3rem] md:text-[2.5rem] text-gray-700 font-bold">
        Sign Up as Student
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
    <Typography className="text-black font-semibold mb-2">Full Name</Typography>
    <TextField
    value={formdata.name}
    onChange={handleChange}
    fullWidth
    required
    placeholder="Enter your full name"
    variant="outlined"
    name="name"
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
      disabled={!formdata.name || !formdata.email || !formdata.password}
      className="text-white font-bold bg-black normal-case w-full rounded-[6px] h-10">
        Get Started
      </Button>
    )}
    </Box>
    
    <Box className="mr-20">
    <Typography className="text-gray-500 mt-3 text-[13px] sm:text-[17px] text-wrap">
    By Signing up, you agree to our <span className="underline hover:text-black cursor-pointer">Terms of Use</span> and <span className="underline hover:text-black cursor-pointer">Privacy Policy</span> 
    </Typography>
    </Box>

     </Box>

    </Box>

  </Box>

{/* ------------------------------------------------------------------------------------- */}
        <img 
        className="h-screen hidden md:block md:w-[42vw]"
        src={SignUpImage} alt="Image" />

      </Box>

      </>
    );
  };

export default StudentRegister;