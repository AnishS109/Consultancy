import axios from 'axios'
import React, { useContext, useState } from 'react'
import MainHome from '../MainHome'
import { Alert, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, Snackbar, TextField, Typography } from '@mui/material'
import { DataContext } from '../../Context/DataProvider'

export const AddAdminContent = () => {

  const { backendUrl } = useContext(DataContext)

// -------------------- USE STATES -----------------

  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
    edit:false,
    delete:false,
    type:false
  })
  const [load, setLoad] = useState(false)
  const [modalMsg, setModalMsg] = useState({open:false, message:"", severity:""})

// --------------------- HANDLE CHANGE -------------------

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target
    setData({...data, [name]:type === "checkbox" ? checked : value})
  }

// ---------------------- HANDLE SUBMIT ---------------------

  const handleSubmit = async() => {
    setLoad(true)

    if(!data.email.includes("@gmail.com")){
      setLoad(false)
      setModalMsg({open:true, message:"Enter Valid Email", severity:"error"})
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/MainAdmin/Add-Admin`, data)
      if(response.status == 201){
        setModalMsg({open:true, message:response.data.message, severity:"success"})
      }
    } catch (error){
      setModalMsg({open:true, message:error.response.data.message, severity:"error"})
    } finally {
      setLoad(false)
      setData({
        name:"",
        email:"",
        password:"",
        edit:false,
        delete:false
      })
    }
  } 

    return (
    <>
    <Box className="flex justify-center h-full">

{/* ----------------------------- MAIN CONTAINER ------------------------------- */}

    <Box className="h-fit w-fit p-8 mt-10">

    <TextField
      fullWidth
      label="Name"
      variant="outlined"
      name="name"
      className='mt-4'
      value={data.name}
      onChange={handleChange}
      required
    />

    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      name="email"
      className='mt-4'
      value={data.email}
      onChange={handleChange}
      required
    />

    <TextField
      fullWidth
      label="Password"
      variant="outlined"
      name="password"
      className='mt-4'
      value={data.password}
      onChange={handleChange}
      required
    />

    <FormGroup className='mt-6'>
      <FormControlLabel
      control={ <Checkbox checked={data.edit} onChange={handleChange} name="edit"/> }
      label="Edit Permission"
      />
      <FormControlLabel
      control={<Checkbox checked={data.delete} onChange={handleChange} name='delete'/>}
      label="Delete Permission"
      />
    </FormGroup>
    
    {load ? (
      <Box className="w-full flex justify-center mt-4">
      <CircularProgress size={30} className='text-black'/>
      </Box>
    ) : (
      <Button 
      variant='outlined'
      fullWidth
      className='mt-4 text-black border-black'
      onClick={handleSubmit}
      disabled={!data.name || !data.email || !data.password}
      >
        Create Admin
      </Button>
    )}

    </Box>

    </Box>

{/* --------------------------------- SNACK BAR ------------------------------ */}
{/* --------------------------------- SNACK BAR ------------------------------ */}
{/* --------------------------------- SNACK BAR ------------------------------ */}

  <Snackbar
  open={modalMsg.open}
  autoHideDuration={3000}
  onClose={() => setModalMsg({...modalMsg, open:false})}
  anchorOrigin={{vertical:'top', horizontal:'center'}}
  >
    <Alert onClose={() => setModalMsg({...modalMsg,open:false})} severity={modalMsg.severity} sx={{ width: '100%' }}>
      <b>{modalMsg.message}</b>
    </Alert>
  </Snackbar>
    </>
    )
}

const AddAdmin = () => {
  return (
    <div>
        <MainHome/>
    </div>
  )
}

export default AddAdmin