import React, { useState, useRef, useContext, useEffect } from 'react'
import ConsultHome from '../ConsultHome'
import { Alert, Avatar, Box, Button, CircularProgress, Snackbar, TextField, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../../Context/DataProvider'
import axios from "axios"

import CheckIcon from '@mui/icons-material/Check';

// -----------------------------------------------------------------------------------------

export const ConsultDashProfileContent = () => {

  const [activeButton, setActiveButton] = useState("Profile")

  const {account, backendUrl} = useContext(DataContext)

// --------------------------------- PROFILE SECTION ---------------------------------------
// --------------------------------- PROFILE SECTION ---------------------------------------
// --------------------------------- PROFILE SECTION ---------------------------------------

  const fileInputRef = useRef(null);
  const CollegeIdInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleButtonClicks = () => {
    CollegeIdInputRef.current.click();
  };

// ------------------------------------------------------------------------------

  const ImageUpload = async(img) => {
    const serverResponse = {
      img,
      email:account.email,
      role:account.role,
    }
    try {
      const response = await axios.post(`${backendUrl}/Consult/Consult-Profile-image-Data-Save`, serverResponse)
      if(response.status === 200){
        setMessageModal({ open: true, message: response.data.message, severity: 'success' })
      }
    } catch (error) {
      // console.log(error.response.data.message)
    }
  }

// -----------------------------------------------------------------------------

  const DocImageUpload = async(img) => {
    const serverResponse = {
      img,
      email:account.email,
      role:account.role,
    }
    try {
      const response = await axios.post(`${backendUrl}/Consult/Consult-College-ID-image-Data-Save`, serverResponse)
      if(response.status === 200){
        setMessageModal({ open: true, message: response.data.message, severity: 'success' })
      }
    } catch (error) {
      // console.log(error.response.data.message)
    }
  }

// ------------------------------------------------------------------------------

  const ProfileHandleImageUpload = async() => {
    setloading(true)
    const formdata = new FormData();
      formdata.append("file", file);
      // formdata.append("file", docFile)

    try {
      const response = await axios.post(`${backendUrl}/Consult/Consult-profile-Image`, formdata)
      if(response.status === 200){
        const imageUrl = `${backendUrl}/Consult/file/${response.data}`
          ImageUpload(imageUrl)
          // DocImageUpload(imageUrl)
      }
    } catch (error) {
      setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
    } finally {
      setloading(false)
    }
  }

  const ProfileHandleImageIDUpload = async() => {
    setloadings(true)
    const formdata = new FormData();
      // formdata.append("file", file);
      formdata.append("file", docFile)

    try {
      const response = await axios.post(`${backendUrl}/Consult/Consult-profile-Image`, formdata)
      if(response.status === 200){
        const imageUrl = `${backendUrl}/Consult/file/${response.data}`
          // ImageUpload(imageUrl)
          DocImageUpload(imageUrl)
      }
    } catch (error) {
      setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
    } finally {
      setloadings(false)
    }
  }

// ---------------------------------------------------------------------------------

  const [file,setFile] = useState("")
  const [docFile, setDocFile] = useState("")
  const [loading, setloading] = useState(false)
  const [loadings, setloadings] = useState(false)
  const [dataLoading, setDataloading] = useState(false)
  const [messageModal, setMessageModal] = useState({ open: false, message: '', severity: 'success' });

  const [profileData, setProfileData] = useState({
    name:account.name,
    univerityName:"",
    collegeName:"",
    countryName:"",
    degreeName:"",
    email:account.email,
    role:account.role,
    consultPhoneNumber:"",
    consultSkills:"",
    consultLinkedinUrl:"",
    consultExperienceYears:"",
    consultDescription:"",
    consultAbout:""
  })  
  
// ---------------------------------------------------------------------------------

const handleCloseMessageModal = () => setMessageModal({ ...messageModal, open: false });

// ---------------------------------------------------------------------------------

const ProfilehandleChange = (e) => {
  const {name, value} = e.target
    setProfileData({...profileData, [name]:value})
  }
  
// ---------------------------------------------------------------------------------

const ProfileSubmitHandle = async(e) => {
  e.preventDefault()
  setDataloading(true)

  if(profileData.consultPhoneNumber.length !== 10){
    setMessageModal({ open: true, message: 'Enter 10 Digit Mobile Number', severity: 'error' })
    setDataloading(false)
    return
  }

  try {
    const response = await axios.post(`${backendUrl}/Consult/Updating-Profile-Data`, profileData)
    if(response.status === 200){
      setMessageModal({ open: true, message: response.data.message, severity: 'success' })
    }
  } catch (error) {
    setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
  } finally {
    setDataloading(false)
  }
}

// ---------------------------------------------------------------------------------
  useEffect(() => {
  const fetchProfileData = async() => {
    const serverResponse = {
      email:profileData.email,
      role:profileData.role
      }

      try {
        const response = await axios.get(`${backendUrl}/Consult/Fetch-Profile-Data`, {
          params:serverResponse
        })
        if(response.status === 200){
          setProfileData(response.data)
        }
      } catch (error) {
        setMessageModal({ open: true, message: error.response?.data?.message || "Please enable mobile data or connect to a network.", severity: 'error' })
      }
    }
    fetchProfileData()
  },[backendUrl])

// ---------------------------------------------------------------------------------

  return (
<>
{/* ---------------------------------- HEADER --------------------------------- */}

<Box className="h-fit border-b-2 w-[100%] flex flex-col sticky top-0 z-10 bg-white">

  <Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10'>
    Profile
  </Typography>
  
  <Box className="flex pb-2 px-5 gap-4 sm:gap-6 justify-between">
  <Box className='flex pb-2 px-5 gap-4 sm:gap-6'>
  <Button 
  onClick={() => {
    setActiveButton("Profile")
  }}
  variant={`${activeButton === "Profile" ? "outlined":"contained"}`}
  className={`font-semibold w-fit bg-white text-black border-black normal-case rounded-[30px]`}>
    Profile
  </Button>

  <Button 
  variant={`${activeButton === "Account" ? "outlined":"contained"}`}
  onClick={() => setActiveButton("Account")}
  className={'font-semibold w-fit bg-white text-black border-black normal-case rounded-[30px]'}>
    Account
  </Button>

  </Box>

{dataLoading ? (
  <CircularProgress className='text-black mr-6 sm:mr-10 md:mr-14'/>
):(
  <Button 
  onClick={ProfileSubmitHandle} 
  variant='outlined'
  className=' normal-case h-10 text-nowrap bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
  Save Changes
</Button>
)}
  </Box>

</Box>  

{/* -------------------------------------- REMAINING ---------------------------------------- */}
  
  {activeButton === "Profile" ? (

<>
    
<Box className="flex gap-5 items-center px-8 sm:pl-32 py-4 justify-between md:w-[60vw]">
  <Box className="flex gap-10 sm:gap-14 md:gap-10 items-center">
  <Avatar
  onClick={handleButtonClick} 
  className='h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28'
  src={profileData.consultImage ? (profileData.consultImage): ("")}
  />
  
  <Box className="flex flex-col">
  <Typography className='text-black text-nowrap text-[14px] sm:text-[16px] md:sm:text-[18px] font-semibold'>
    Profile Photo
  </Typography>
  <Typography className='text-gray-600 text-[12px] sm:text-[14px] md:sm:text-[15px]'>
    Required
  </Typography>
  </Box>
  </Box>
  
  <Box className="flex flex-wrap justify-center gap-1">
  <div>
    <input 
      type="file" 
      ref={fileInputRef} 
      className="hidden" 
      onChange={(e) => setFile(e.target.files[0])} 
    />
  </div>  

  {loading ? (
    <CircularProgress className='text-black sm:ml-8'/>
  ): (
    <Button 
    onClick={ProfileHandleImageUpload}   
    variant='outlined'
    className='normal-case text-nowrap text-[12px] sm:text-[15px] md:text-[16px] bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
    Upload Photo
  </Button>
  )}
  </Box>
</Box>

{/* ------------------------------------------------------------------------------ */}

<Box className="flex gap-5 items-center px-8 sm:pl-32 py-4 justify-between 
md:w-[60vw] my-4">

{profileData.consultIdImage !== "" ? (

  <Typography className='text-green-500 font-bold'>
  <span><CheckIcon/></span> College ID Uploaded</Typography>

) : (
  <>

  <Box className="flex flex-col">
  <Typography
   onClick={handleButtonClicks}
   className='text-black cursor-pointer hover:underline text-nowrap text-[14px] sm:text-[16px] md:sm:text-[18px] font-semibold'>
    Select College ID
  </Typography>
  <Typography className='text-gray-600 text-[12px] sm:text-[14px] md:sm:text-[15px]'>
    Required
  </Typography>
  </Box>

  <div>
    <input 
      type="file" 
      ref={CollegeIdInputRef} 
      className="hidden" 
      onChange={(e) => setDocFile(e.target.files[0])} 
    />
  </div> 

  {loadings ? (
    <CircularProgress className='text-black sm:ml-8'/>
  ): (
    <Button 
    onClick={ProfileHandleImageIDUpload} 
    variant='outlined'
    className='normal-case text-nowrap text-[12px] sm:text-[15px] md:text-[16px] bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
    Upload Photo
  </Button>
  )}

  </>
)}

</Box>

{/* ------------------------------------------------------------------------------ */}


<Box className="mx-auto h-fit px-8 sm:w-[70vw] md:w-[60vw] md:pr-32">

<Typography className="text-black font-semibold mb-1">Full Name</Typography>
<TextField
type="text"
value={profileData.name}
onChange={ProfilehandleChange}
required
placeholder="Enter your name"
variant="outlined"
name="name"
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

<Typography className="text-black font-semibold mb-1">Phone Number</Typography>
<TextField
value={profileData.consultPhoneNumber}
onChange={ProfilehandleChange}
required
type="number"
placeholder="Enter your Phone Number"
variant="outlined"
name="consultPhoneNumber"
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

<Typography className="text-black font-semibold mb-1">Location</Typography>
<TextField
type="text"
value={profileData.countryName}
onChange={ProfilehandleChange}
required
placeholder="Enter your Location here"
variant="outlined"
name="countryName"
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

<Typography className="text-black font-semibold mb-1">College Name</Typography>
<TextField
type="text"
value={profileData.collegeName}
onChange={ProfilehandleChange}
required
placeholder="Enter your College Name"
variant="outlined"
name="collegeName"
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

<Typography className="text-black font-semibold mb-1">University Name</Typography>
<TextField
type="text"
value={profileData.univerityName}
onChange={ProfilehandleChange}
required
placeholder="Enter your University Name"
variant="outlined"
name="univerityName"
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

<Typography className="text-black font-semibold mb-1">Degree</Typography>
<TextField
type="text"
value={profileData.degreeName}
onChange={ProfilehandleChange}
required
placeholder="Enter your Degree here"
variant="outlined"
name="degreeName"
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

<Typography className="text-black font-semibold mb-1">Skills</Typography>
<TextField
type="text"
value={profileData.consultSkills}
onChange={ProfilehandleChange}
required
placeholder="e.g. Data Analytics, Machine Learning"
variant="outlined"
name="consultSkills"
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

<Typography className="text-black font-semibold mb-1">Linkedin Url</Typography>
<TextField
type="text"
value={profileData.consultLinkedinUrl}
onChange={ProfilehandleChange}
required
placeholder="Enetr your Linkedin Profile Url"
variant="outlined"
name="consultLinkedinUrl"
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

<Typography className="text-black font-semibold mb-1">Experience</Typography>
<TextField
type="number"
value={profileData.consultExperienceYears}
onChange={ProfilehandleChange}
required
placeholder="in years"
variant="outlined"
name="consultExperienceYears"
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

<Typography className="text-black font-semibold mb-1">About yourself</Typography>
<TextField
type="text"
value={profileData.consultAbout}
onChange={ProfilehandleChange}
required
placeholder="Enetr your description here"
variant="outlined"
name="consultAbout"
multiline
rows={2}
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

<Typography className="text-black font-semibold mb-1">Description</Typography>
<TextField
type="text"
value={profileData.consultDescription}
onChange={ProfilehandleChange}
required
placeholder="Enetr your description here"
variant="outlined"
name="consultDescription"
multiline
rows={4}
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


  {/*-------------------- Snackbar for messages ---------------------*/}

  <Snackbar
    open={messageModal.open}
    autoHideDuration={3000}
    onClose={handleCloseMessageModal}
    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
  >
    <Alert onClose={handleCloseMessageModal} severity={messageModal.severity} sx={{ width: '100%' }}>
      <b>{messageModal.message}</b>
    </Alert>
  </Snackbar>

</Box>

{/* ------------------------------------------------------------------------------ */}

</>

  ): (

    <>
    </>

  )}

</>
  )
}

// ------------------------------------------------------------------------------------------------------

const C_DashProfile = () => {
  return (
    <>
    <ConsultHome/>
    </>
  )
}

export default C_DashProfile