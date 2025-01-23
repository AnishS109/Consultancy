import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { DataContext } from "../Context/DataProvider";

  const StudentRegister = () => {

    const {backendUrl } = useContext(DataContext)
    
    // ---------------------------------------------------------------------------
    
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // ---------------------------------------------------------------------------
    
    const [formdata, setFormData] = useState({
      name:"",
      email:"",
      password:"",
      degree:"",
      preferredCountry:"",
      preferredCourse:"",
      preferredUniversity:"",
      username:"",
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
      
      if(formdata.password.length < 8){
        setLoading(false)
        setErrorMsg("Password must be 8 character long.")
        return
      }
      
      if(formdata.username.length < 8){
        setLoading(false)
        setErrorMsg("Username must be 8 character long.")
        return
      }

      try {
        const response = await axios.post(`${backendUrl}/Student/Register`, formdata)
        
        if(response.status === 200){
          setErrorMsg("")
          setSuccessMsg("Registered SuccessFully")
          setTimeout(() => {
            navigate("/login")
          },1000)
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || "Error While Registering, Please Try again later!")
      } finally {
        setLoading(false)
      }
    }

    // ---------------------------------------------------------------------------
    return (
          <Box className="flex justify-center items-center h-screen p-4 bg-gray-100">
      <Box className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      sx={{
        boxShadow:"0px 7px 10px 2px rgba(0,0,0,0.3)",
        width:{
          xs:"85vw",
          sm:"auto"
        }
      }}>
        <Typography variant="h5" className="font-bold text-center mb-6">
          Student Registration
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

        <form className="space-y-2" onSubmit={handleSubmit}>
          {/* Name */}
          <TextField
            label="Name"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            className="bg-gray-100"
          />

          <TextField
            label="Username"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            className="bg-gray-100"
          />

          {/* Email */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formdata.email}
            onChange={handleChange}
            required
            type="email"
            className="bg-gray-100"
          />

          {/* Password */}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
            type="password"
            className="bg-gray-100"
          />

          {/* Preferred Degree Type */}
          <FormControl fullWidth>
            <InputLabel id="degree-label">Preferred Degree Type</InputLabel>
            <Select
              labelId="degree-label"
              name="degree"
              value={formdata.degree}
              onChange={handleChange}
              label="Preferred Degree Type"
              className="bg-gray-100"
              required
            >
              <MenuItem value="Bachelors">Bachelors</MenuItem>
              <MenuItem value="Masters">Masters</MenuItem>
            </Select>
          </FormControl>

          {/* Optional Preferences: Country, Course, University */}
          <div className="space-y-2">
            <TextField
              name="preferredCountry"
              value={formdata.preferredCountry}
              onChange={handleChange}
              label="Preferred Country"
              variant="outlined"
              fullWidth
              className="bg-gray-100"
            />

            <TextField
              label="Preferred Course"
              name="preferredCourse"
              value={formdata.preferredCourse}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              className="bg-gray-100"
            />

            <TextField
              label="Preferred University"
              name="preferredUniversity"
              value={formdata.preferredUniversity}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              className="bg-gray-100"
            />
          </div>

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
            Submit
          </Button>
          )}
        </form>

        <Box fullWidth className="text-center mt-2">
        <Typography sx={{ color: "black" }}>
          <strong> Want to register as Consultant? </strong>
            <NavLink to={"/Consultant/Register"}>
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

  export default StudentRegister;