import React, { useContext, useEffect, useState } from 'react'
import ConsultHome from '../ConsultHome'
import { Alert, Box, Button, CircularProgress, Snackbar, TextField, Typography } from '@mui/material'

import { FaSave } from "react-icons/fa";
import { MdEdit } from 'react-icons/md'
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';

export const C_package_content = () => {

  const buttons = ["Package1","Package2","Package3", "Package4","PriorityDM"]

// -------------- CONTEXT PROVIDER ----------------

  const {backendUrl, account} = useContext(DataContext)

// ----------------- USE STATES -----------------

  const [active, setActive] = useState("Package1")
  const [isEdit, setIsEdit] = useState(false)
  const [load, setLoad] = useState(false)
  const [SaveLoad, setSaveLoad] = useState(false)
  const [packageData, setPackageData] = useState({
    type:active,
    email:account.email,
    role:account.role,
    name:account.name,
    title:"",
    price:"",
    time:"",
    description:""
  })
  const [messageModal, setMessageModal] = useState({ open: false, message: '', severity: '' });

// ------------- UPDATING TYPE OF PACKAGE ----------------

  useEffect(() => {
    setPackageData({...packageData, type:active})
  },[active])

// -------------- HANDLE ON CHANGE -------------------

  const handleChange = (e) => {
    const {name, value} = e.target
    setPackageData({...packageData,[name]:value})
  }

// -------------- HANDLE SUBMIT --------------------

  const handleSubmit = async() => {
    setSaveLoad(true)

    if(!packageData.time || !packageData.description || !packageData.price || !packageData.title){
      setSaveLoad(false)
      setMessageModal({open:true, message:"All Fields are Required", severity:"error"})
      return
    }

    if(Number(packageData.time) <= 0){
      setSaveLoad(false)
      setMessageModal({open:true, message:"Time should be a positive number", severity:"error"})
      return
    }

    if(Number(packageData.price) <= 0){
      setSaveLoad(false)
      setMessageModal({open:true, message:"Price should be a positive number", severity:"error"})
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/Consult/Adding-Package-Details`, packageData)
      if(response.status === 200){
        setMessageModal({open:true, message:response?.data?.message || "Package Updated Successfully", severity:"success"})
        setIsEdit(false)
      }
    } catch (error) {
      setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"})
    } finally {
      setSaveLoad(false)
    }
  }

// ------------ FETCHING PACKAGE DETAILS -----------

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true)
      const email = account.email
      try {
        const response = await axios.get(`${backendUrl}/Consult/Fetching-Package-Details`, {
          params: { email }
        });

        if (response.status === 200) {
          const fetchedData = response.data;

          const activePackageData = {
            title: fetchedData[`${active}Title`] || "",
            price: fetchedData[`${active}Price`] || "",
            time: fetchedData[`${active}Time`] || "",
            description: fetchedData[`${active}Description`] || "",
          };

          setPackageData(prevState => ({
            ...prevState,
            ...activePackageData
          }));
        }
      } catch (error) {
        // setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"})
      } finally {
        setLoad(false)
      }
    };

    fetchData();
  }, [active, SaveLoad])


  return (
<>

{/* ------------- PACKAGE SECTION HEADER ---------------- */}

<Box className="border-b-2 h-fit flex justify-center">

<Box className="mx-5 my-8 flex gap-2 md:gap-4 flex-wrap justify-center">
{buttons.map((data,idx) => (
<Button 
onClick={() => setActive(data)}
className={`normal-case border-black ${active == data ? "text-white bg-black font-bold" : "text-black"}`}
variant='outlined'
key={idx}>
 {data}
</Button>
))}

</Box>

</Box>

{/* ---------------- SAVE and EDIT BUTTON --------------- */}

<Box className="h-fit mt-4 flex justify-end mr-6 sm:mr-10 md:mr-20">
  {load ? (
    <Box className="h-10">
      <CircularProgress size={30} className='text-black'/>
    </Box>
  ) : SaveLoad ? (
    <Box className="h-10">
      <CircularProgress size={30} className='text-black'/>
    </Box>
  ) : (
    <>
      {!isEdit ? (
        <Button 
          onClick={() => setIsEdit(true)}
          variant='outlined'
          className='normal-case h-10 text-nowrap bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
          <span><MdEdit className='text-sm mr-1'/></span> Edit Profile
        </Button>
      ) : (
        <Button 
          onClick={handleSubmit}
          variant='outlined'
          className='normal-case h-10 text-nowrap bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
          <span><FaSave className='text-sm mr-1'/></span> Save Changes
        </Button>
      )}
    </>
  )}
</Box>


{/* -------------- PACKAGES INPUT FIELDS ---------------- */}

<Box className="mx-6 sm:mx-10 md:mx-20">

{/* ---------------- TITLE FIELD --------------------- */}

<Box className="mt-4">
<Typography className="text-black font-semibold mb-2">{active} Title</Typography>
<TextField
type="text"
disabled={!isEdit}
value={packageData.title}
onChange={handleChange}
required
placeholder={`Enter ${active} Title Here`}
variant="outlined"
name={`title`}
className="mb-5 bg-gray-100 rounded-lg w-full"
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

{/* -------------- PRICE and TIME FIELD ---------------*/}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-4">

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">{active} Price (in $)</Typography>
<TextField
type="number"
disabled={!isEdit}
value={packageData.price}
onChange={handleChange}
required
placeholder={`Enter ${active} Price Here`}
variant="outlined"
name={`price`}
className="mb-5 bg-gray-100 rounded-lg w-full"
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

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">{active} Time (in mins)</Typography>
<TextField
type="number"
disabled={!isEdit}
value = {packageData.time}
onChange={handleChange}
required
placeholder={`Enter ${active} Time Here`}
variant="outlined"
name={`time`}
className="mb-5 bg-gray-100 rounded-lg w-full"
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

</Box>

{/* ------------------ DESCRIPTION ------------------- */}

<Box className="w-full mt-4">
<Typography className="text-black font-semibold mb-1">{active} Description</Typography>
<TextField
multiline
rows={14}
type="text"
disabled={!isEdit}
value={packageData.description}
onChange={handleChange}
required
placeholder={`Enter ${active} Description Here`}
variant="outlined"
name={`description`}
className="mb-5 bg-gray-100 rounded-lg w-full"
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

{/*-------------------- SNACKBAR ---------------------*/}

<Snackbar
    open={messageModal.open}
    autoHideDuration={3000}
    onClose={() => setMessageModal({ ...messageModal, open: false })}
    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
  >
    <Alert onClose={() => setMessageModal({ ...messageModal, open: false })} severity={messageModal.severity} sx={{ width: '100%' }}>
      <b>{messageModal.message}</b>
    </Alert>
</Snackbar>

</Box>

</>
  )
}

const C_Package = () => {
  return (
    <>
      <ConsultHome/>
    </>
  )
}

export default C_Package