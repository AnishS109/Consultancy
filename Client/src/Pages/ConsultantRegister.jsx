import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';
import axios from 'axios';

const ConsultantRegister = () => {

  const {backendUrl} = useContext(DataContext)

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    username:"",
    email: '',
    password: '',
    country: '',
    university: '',
    courseMajor: '',
    examDetails: '',
    role:"Consultant"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrorMsg("")
  },[formData])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    console.log(formData);
    

    try {
      const response = await axios.post(`${backendUrl}/Consultant/Register`, formData)

      if(response.status === 200){
        setErrorMsg("")
        setSuccessMsg("Successfully Registered")
        setTimeout(() => {
          navigate("/login")
        },1000)
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Error while registering, Please try again later")
    } finally {
      setLoading(false)
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen p-4 bg-gray-100">
      <Box className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <Typography variant="h5" className="font-bold text-center mb-6">
          Consultant Registration
        </Typography>

        {errorMsg && (
          <Typography className="text-red-600 mb-4 text-center bg-red-100">
            {errorMsg}
          </Typography>
        )}

        {successMsg && (
          <Typography className="text-green-600 mb-4 text-center bg-green-100">
            {successMsg}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <TextField
            label="Name"
            required
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          {/* Email */}
          <TextField
            label="Email"
            required
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          <TextField
            label="Username"
            required
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          {/* Password */}
          <TextField
            label="Password"
            required
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          {/* Country */}
          <TextField
            label="Country"
            required
            variant="outlined"
            fullWidth
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          {/* University/Institution Name */}
          <TextField
            label="University/Institution Name"
            required
            variant="outlined"
            fullWidth
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          {/* Course and Major */}
          <TextField
            label="Course and Major"
            placeholder='(e.g., Masters in Computer Science)'
            variant="outlined"
            fullWidth
            name="courseMajor"
            value={formData.courseMajor}
            onChange={handleChange}
            className="mb-2 bg-gray-100"
          />

          {/* Exam Details */}
          <TextField
            label="Exam Details"
            placeholder='(e.g., GRE: 320, TOEFL: 115)'
            variant="outlined"
            fullWidth
            name="examDetails"
            value={formData.examDetails}
            onChange={handleChange}
            className="mb-3 bg-gray-100"
          />

          {/* Submit Button */}
          {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
          ):(
            <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 text-white"
          >
            Register
          </Button>
          )}
        </form>

        <Box fullWidth className="text-center mt-2">
        <Typography sx={{ color: "black" }}>
          <strong> Want to register as Student? </strong>
            <NavLink to={"/Register"}>
              <Button><strong>Click here</strong></Button>
            </NavLink>
        </Typography>
        </Box>

        <Box fullWidth className="text-center mt-1">
        <Typography sx={{ color: "black" }}>
            Already have an account?
            <NavLink to={"/login"}>
              <Button>Sign in</Button>
            </NavLink>
        </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default ConsultantRegister;
