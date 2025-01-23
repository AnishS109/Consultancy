import React, { useContext, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import axios from "axios";

const Login = () => {

  const {backendUrl, setAccount} = useContext(DataContext)

  const [loading, setLoading] = useState(false)
  const [errorMsg,setErrorMsg] = useState("")

  const navigate = useNavigate()

  const [formdata, setFormData] = useState({
    username:"",
    password:"",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formdata, [name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

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

  return (
    <>

    <Box className="h-[80vh] flex justify-center items-center p-5 bg-cover bg-center bg-no-repeat overflow-hidden text-white">
    <Box className="w-full max-w-[400px] bg-white bg-opacity-85 rounded-xl p-6 text-center 
    backdrop-blur-md" sx={{boxShadow:"0px 2px 20px rgba(0,0,0,0.3)"}}>

    {/* --------- LOGIN FORM --------- */}
    <Typography
      variant="h4"
      component="h1"
      className="font-semibold mb-2 text-gray-800"
    >
      Login Here!
    </Typography>

    {/* --------- ERROR MESSAGE --------- */}
    {errorMsg && (
    <Typography
      variant="body1"
      className="text-red-600 mb-3 font-bold text-sm text-center"
    >
      {errorMsg}
    </Typography>
    )}

    <Typography
      variant="subtitle1"
      className="text-sm mb-7 text-gray-600"
    >
      Please log in to access your account
    </Typography>

    <TextField
      label="username or Email"
      placeholder="Enter your username or email"
      variant="outlined"
      fullWidth
      name="username"
      onChange={handleChange}
      value={formdata.username}
      className="mb-5 bg-gray-100 rounded-lg"
    />

    <TextField
      label="password"
      placeholder="Enter your password"
      variant="outlined"
      type="password"
      name="password"
      onChange={handleChange}
      value={formdata.password}
      fullWidth
      className="mb-7 bg-gray-100 rounded-lg"
    />

    {loading ? (
      <CircularProgress/>
    ): (
      <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handleSubmit}
      className="mb-5 py-2 font-semibold text-lg rounded-full"
      >
        Login
      </Button>
    )}


    {/* --------- ROUTES FOR REGISTER --------- */}
    <Typography className="text-black mt-1 mb-2">
      Don't have an account?
      <NavLink to={"/register"}>
        <Button
          size="small"
          className="text-xs font-bold text-blue-600 p-0"
        >
          Sign Up
        </Button>
      </NavLink>
    </Typography>

    {/* --------- ROUTES FOR FORGET password --------- */}
    <Typography className="text-sm text-gray-600">
      Forgot password?{" "}
      <NavLink to={"/ForgotPassword"}>
        <Button
          size="small"
          className="text-xs font-bold text-blue-600 p-0"
        >
          Click here
        </Button>
      </NavLink>
    </Typography>
  </Box>
</Box>

    </>
  )
}

export default Login