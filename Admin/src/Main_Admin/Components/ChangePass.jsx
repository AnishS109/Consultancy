import axios from 'axios';
import React, { useContext, useState } from 'react'
import MainHome from '../MainHome'
import { Alert, Box, Button, CircularProgress, Snackbar, TextField } from '@mui/material'

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import changePassImg from "../../assests/changePass.jpg"
import { DataContext } from '../../Context/DataProvider';


export const ChangePassContent = () => {

    const { backendUrl, account } = useContext(DataContext)

// ----------------------- PASSWORD VISIBILITY ------------------------

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const togglePasswordVisibilitys = () => {
        setShowPasswords((prev) => !prev);
    };

// ---------------------------- USE STATES ------------------------

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [data, setData] = useState({
        password:"",
        confirmPassword:""
    })
    const [load, setLoad] = useState(false)
    const [modalMsg, setModalMsg] = useState({open:false, message:"", severity:""})

// ----------------------------- HANDLE CHANGE -------------------------

   const handleChange = (e) => {
    const {name, value} = e.target
    setData({...data,[name]:value})
   }

// ------------------------------- HANDLE SUBMIT ----------------------------

   const handleSubmit = async() => {
    const serverData = {email:account.email, password:data.password}
    setLoad(true)

    if(data.confirmPassword !== data.password){
        setLoad(false)
        setModalMsg({open:true, message:"Confirm password is not matched!", severity:"error"})
        return
    }

    if(data.password.length < 7){
        setLoad(false)
        setModalMsg({open:true, message:"Password must contain atleast 8 digits", severity:"error"})
        return
    }

    try {
        const response = await axios.post(`${backendUrl}/MainAdmin/Change-Password`, serverData)
        if(response.status == 200){
            setModalMsg({open:true, message:response.data.message, severity:"success"})
        }
    } catch (error) {
        setModalMsg({open:true, message:error.response.data.message, severity:"error"})
    } finally {
        setLoad(false)
        setData({
            password:"",
            confirmPassword:""
        })
    }
   }
    
    return (
    <>
{/* ------------------------- OUTSIDE CONTAINER ------------------------- */}

    <Box className="flex justify-center items-center w-full h-full p-6">

{/* --------------------------- MAIN CONTAINER -------------------------- */}

    <Box className="h-full w-full pt-32">

    <Box className="sm:px-4">
        <TextField
          value={data.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          fullWidth
          label="Password"
          required
          placeholder="Enter your password"
          variant="outlined"
          name="password"
          className="bg-gray-100 rounded-lg"
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
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className="sm:px-4 mt-4">
        <TextField
          value={data.confirmPassword}
          onChange={handleChange}
          type={showPasswords ? "text" : "password"}
          fullWidth
          label="Confirm Password"
          required
          placeholder="Confirm your Password"
          variant="outlined"
          name="confirmPassword"
          className="bg-gray-100 rounded-lg"
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
                <IconButton
                  onClick={togglePasswordVisibilitys}
                  edge="end"
                >
                  {showPasswords ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {load ? (
        <Box className="w-full flex justify-center mt-4">
            <CircularProgress size={30} className='text-black'/>
        </Box>
      ) : (
        <Box className="sm:px-4">
        <Button
        variant='outlined'
        fullWidth
        className='text-black border-black mt-6'
        onClick={handleSubmit}
        disabled={!data.password || !data.confirmPassword}
        >
          Change Password
        </Button>
        </Box>
      )}

    </Box>

{/* ----------------------------- IMAGE CONATAINER ----------------------- */}

    <Box className="h-full hidden sm:block">
        <img className='h-[85vh] w-[90vw]' src={changePassImg} alt="Image" />
    </Box>

    </Box>

{/* ------------------------------- SNACKBAR ----------------------------- */}
{/* ------------------------------- SNACKBAR ----------------------------- */}
{/* ------------------------------- SNACKBAR ----------------------------- */}

   <Snackbar
   open={modalMsg.open}
   onClose={() => setModalMsg({...modalMsg, open:false})}
   autoHideDuration={3000}
   anchorOrigin={{vertical:'top', horizontal:'center'}}
   >
    <Alert
    onClose={() => setModalMsg({...modalMsg, open:false})}
    severity={modalMsg.severity}
    sx={{ width: '100%' }}
    >
        <b>{modalMsg.message}</b>
    </Alert>
   </Snackbar>
    </>
    )
}

const ChangePass = () => {
  return (
    <>
    <MainHome/>
    </>
  )
}

export default ChangePass