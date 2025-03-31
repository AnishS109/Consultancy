import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Snackbar, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { DataContext } from "../Context/DataProvider"

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const { backendUrl, setAccount } = useContext(DataContext)

  // -------------------- USESTATES ----------------------

  const [login,setLogin] = useState({
    email:"",
    password:""
  })
  const [modalMsg, setModalMsg] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [load, setLoad] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  // ----------------- HANDLE CHANGING -------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setLogin({...login, [name]:value})
  }

  // ----------------- HANDLE SUBMIT -------------------

  const handleSubmit = async() => {
    setLoad(true)
    try {
      const response = await axios.post(`${backendUrl}/Login`, login);
      if (response.status === 200) {
        setAccount(response.data);
        if (response.data.type === false) {
          navigate("/Consultants");
        } else if (response.data.type === true) {
          navigate("/Admin");
        }
      }
    } catch (error) {
      setModalMsg({message:error.response.data.message, open:true, severity:"error"});
    } finally {
      setLoad(false)
    }
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

{load ? (
  <>
    <CircularProgress className="text-black mt-8" size={30} />
  </>
) : 
(
  <Button
  onClick={handleSubmit}
  variant="contained"
  disabled={!login.email || !login.password}
  className="text-white font-bold bg-black normal-case w-full rounded-[6px] h-10 mt-8">
    Login
  </Button>
)}

<NavLink to={"/Register"}>
<Typography className="text-[#008060] font-bold mt-6 text-[13px] sm:text-[17px] hover:underline">
  Register New Account
</Typography>
</NavLink>

</Box>

{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}

<Snackbar
  open={modalMsg.open}
  autoHideDuration={3000}
  onClose={() => setModalMsg({ ...modalMsg, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    severity={modalMsg.severity}
    sx={{ width: "100%" }}
  >
    <b>{modalMsg.message}</b>
  </Alert>
</Snackbar>
  
</Box>
</>
  )
}

export default Login
