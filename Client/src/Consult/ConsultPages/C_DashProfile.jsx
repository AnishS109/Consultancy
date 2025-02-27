import React, { useState, useRef, useContext, useEffect } from 'react'
import ConsultHome from '../ConsultHome'
import { Alert, Autocomplete, Avatar, Badge, Box, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography, Popper } from '@mui/material'
import { DataContext } from '../../Context/DataProvider'
import axios from "axios"

import { FaUserEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdEdit } from 'react-icons/md'
import { MdDone } from "react-icons/md";

// -----------------------------------------------------------------------------------------

export const ConsultDashProfileContent = () => {

  const {account, backendUrl} = useContext(DataContext)

  // ------------------- COUNTRY LIST ------------------

  const Countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (Swaziland)",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  // ----------------- EXAMS LIST ---------------------

  const Examsss = [
    "IELTS (International English Language Testing System)",
    "TOEFL (Test of English as a Foreign Language)",
    "PTE (Pearson Test of English)",
    "Duolingo English Test",
    "GRE (Graduate Record Examinations)",
    "GMAT (Graduate Management Admission Test)",
    "SAT (Scholastic Assessment Test)",
    "ACT (American College Testing)",
    "LSAT (Law School Admission Test)",
    "MCAT (Medical College Admission Test)",
    "JEE Advanced (Joint Entrance Examination - Advanced)",
    "NEET (National Eligibility cum Entrance Test)",
    "GATE (Graduate Aptitude Test in Engineering)"
  ];

// --------------------------------- PROFILE SECTION ---------------------------------------
// --------------------------------- PROFILE SECTION ---------------------------------------
// --------------------------------- PROFILE SECTION ---------------------------------------

  const Photo1 = useRef(null);
  const Photo2 = useRef(null);
  const Photo3 = useRef(null);
  const CollegeID = useRef(null);

// ----------------------- USE SATES ---------------------------------

  const [messageModal, setMessageModal] = useState({ open: false, message: '', severity: 'success' });
  const [profileData, setProfileData] = useState({
    name:account.name,
    email:account.email,
    role:account.role,
    consultProfilePhoto1:"",
    consultProfilePhoto2:"",
    consultProfilePhoto3:"",
    consultDOB:"",
    consultGender:"",
    consultAddress:"",
    consultCountry:"",
    consultPostalCode:"",
    consultCollegeID:"",
    consultCollegeName:"",
    consultUniversityName:"",
    consultCollegeMajor:"",
    consultAdmissionDate:"",
    consultExamsGiven:"",
    consultSemFees:"",
    consultMonthlyExpenses:"",
    consultBankLoan:"",
    consultBankAccNumber:"",
    consultBankAccHolderName:"",
    consultBankIANnumber:"",
    consultBankSwiftCode:"",
    consultPhoneNumber:"",
    consultLinkedin:"",
    consultYT:"",
    consultInstagram:"",
    consultGitHub:"",
    consultAbout:"",
    consultDescription:""
  })  
  const [isEditing, setIsEditing] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [photo1Loading, setPhoto1Loading] = useState(false)
  const [photo2Loading, setPhoto2Loading] = useState(false)
  const [photo3Loading, setPhoto3Loading] = useState(false)
  const [collegeIDLoading, setCollegeIDLoading] = useState(false)
  const [photo1, setPhoto1] = useState("")
  const [photo2, setPhoto2] = useState("")
  const [photo3, setPhoto3] = useState("")
  const [collegeID, setCollegeID] = useState("")

// ------------------ FOR DOWNWARDING AUTOCOMPLETE --------------------

const CustomPopper = (props) => (
  <Popper
    {...props}
    className="z-50 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300"
  />
);

// ------------------ HANDLE CHANGE --------------------------

const handleChange = (e) => {
  const {name, value} = e.target
  setProfileData({...profileData, [name]:value})
}

// ------------------ HANDLE SUBMIT ------------------------

const handleSubmit = async() => {
  setUpdateLoading(true)
  try {
    const response = await axios.post(`${backendUrl}/Consult/Updating-Profile-Data`, profileData , {
      headers:{
        Authorization:`Bearer ${account.accessToken}`
      }
    })
    if(response.status === 200){
      setMessageModal({open:true, message:response?.data?.message || "Profile Updated Successfully", severity:"success"})
    }
  } catch (error) {
    setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"})
  } finally {
    setUpdateLoading(false)
  }
}

// --------------- FETCHING PROFILE DATA -------------------

useEffect(() => {
  const fteching = async() => {
    setFetchLoading(true)
    try {
      const response = await axios.get(`${backendUrl}/Consult/Fetch-Profile-Data`, {
        params:{email : profileData.email, role: profileData.role},
        headers:{
          Authorization:`Bearer ${account.accessToken}`
        }
      })
      if(response.status === 200){
        setProfileData({...response.data, 
          consultDOB : response.data.consultDOB ? response.data.consultDOB.split("T")[0] : "",
          consultAdmissionDate : response.data.consultAdmissionDate ? response.data.consultAdmissionDate.split("T")[0] : ""})
      }
    } catch (error) {
      setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"})
    } finally {
      setFetchLoading(false)
    }
  }
  fteching()
},[updateLoading, photo1Loading, photo2Loading, photo3Loading])

// --------------- HANDLE UPLOAD PROFILE IMAGE 1 -------------

const UploadImage = async(img) => {
  const serverResponse = {
    email:account.email,
    role:account.role,
    img:img,
  }

  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Profile-Photo1`, serverResponse, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`
      }
    })
    if(response.status === 200){
      setMessageModal({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
    }
  } catch (error) {
    console.log(error.response.data.message)
  } finally {
    setPhoto1("")
  }
}

// ------------- HANDLE PROFILE IMAGE 1 ----------------------

const handleImageUpload = async() => {
  if(photo1 === ""){return}
  const formdata = new FormData();
  formdata.append("file", photo1)
  formdata.append("role", account.role);
  setPhoto1Loading(true)
  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Image-Upload`, formdata,  {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    if(response.status === 200){
      const imageUrl = `${backendUrl}/Consult/file/${response.data}`
      await UploadImage(imageUrl); 
    }
  } catch (error) {
    setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
  } finally {
    setPhoto1Loading(false)
  }
}

useEffect(() => {
  if (photo1 !== "") {
    handleImageUpload();
  }
}, [photo1]);

// --------------- HANDLE UPLOAD PROFILE IMAGE 2 -------------

const UploadImage2 = async(img) => {
  const serverResponse = {
    email:account.email,
    role:account.role,
    img:img,
  }

  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Profile-Photo2`, serverResponse, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`
      }
    })
    if(response.status === 200){
      setMessageModal({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
    }
  } catch (error) {
    // console.log(error.response.data.message)
  } finally {
    setPhoto2("")
  }
}

// ------------- HANDLE PROFILE IMAGE 2 ----------------------

const handleImage2Upload = async() => {
  if(photo2 === ""){return}
  const formdata = new FormData();
  formdata.append("file", photo2)
  formdata.append("role", account.role);
  setPhoto2Loading(true)
  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Image-Upload`, formdata,  {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    if(response.status === 200){
      const imageUrl = `${backendUrl}/Consult/file/${response.data}`
      await UploadImage2(imageUrl); 
    }
  } catch (error) {
    setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
  } finally {
    setPhoto2Loading(false)
  }
}

useEffect(() => {
  if (photo2 !== "") {
    handleImage2Upload();
  }
}, [photo2]);

// --------------- HANDLE UPLOAD PROFILE IMAGE 3 -------------

const UploadImage3 = async(img) => {
  const serverResponse = {
    email:account.email,
    role:account.role,
    img:img,
  }
console.log("start");
  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Profile-Photo3`, serverResponse, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`
      }
    })
    if(response.status === 200){
      setMessageModal({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
    }
  } catch (error) {
    // console.log(error.response.data.message)
  } finally {
    setPhoto3("")
  }
}

// ------------- HANDLE PROFILE IMAGE 3 ----------------------

const handleImage3Upload = async() => {
  if(photo3 === ""){return}
  const formdata = new FormData();
  formdata.append("file", photo3)
  formdata.append("role", account.role);
  setPhoto3Loading(true)
  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Image-Upload`, formdata,  {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    if(response.status === 200){
      const imageUrl = `${backendUrl}/Consult/file/${response.data}`
      await UploadImage3(imageUrl); 
    }
  } catch (error) {
    setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
  } finally {
    setPhoto3Loading(false)
  }
}

useEffect(() => {
  if (photo3 !== "") {
    handleImage3Upload();
  }
}, [photo3]);

// --------------- HANDLE UPLOAD PROFILE IMAGE 3 -------------

const UploadCollegeID = async(img) => {
  const serverResponse = {
    email:account.email,
    role:account.role,
    img:img,
  }
console.log("start");
  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-College-ID-Photo`, serverResponse, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`
      }
    })
    if(response.status === 200){
      setMessageModal({ open: true, message: response?.data?.message || "Check your connection! Try later", severity: 'success' })
    }
  } catch (error) {
    // console.log(error.response.data.message)
  } finally {
    setCollegeID("")
  }
}

// ------------- HANDLE COLLEGE ID IMAGE ----------------------

const handleCollegeIDimage = async() => {
  if(collegeID === ""){return}
  const formdata = new FormData();
  formdata.append("file", collegeID)
  formdata.append("role", account.role);
  setCollegeIDLoading(true)
  try {
    const response = await axios.post(`${backendUrl}/Consult/Consult-Image-Upload`, formdata,  {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    if(response.status === 200){
      const imageUrl = `${backendUrl}/Consult/file/${response.data}`
      await UploadCollegeID(imageUrl); 
    }
  } catch (error) {
    setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
  } finally {
    setCollegeIDLoading(false)
  }
}

useEffect(() => {
  if (collegeID !== "") {
    handleCollegeIDimage();
  }
}, [collegeID]);

  return (
<>
{/* -------------------- EDIT BUTTON & SAVE BUTTON ----------------------------- */}

<Box className="h-fit border-b-2 w-[100%] sticky flex justify-between items-center pr-10 sm:pr-20 top-0 z-10 bg-white">

  <Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10'>
    Profile
  </Typography>

  {!isEditing ? (
  <Button 
  onClick={() => setIsEditing(true)}
  variant='outlined'
  className=' normal-case h-10 text-nowrap bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
  <span><FaUserEdit className='text-sm mr-1'/></span>Edit Profile
</Button>
) : (
  <Button 
  onClick={() => {setIsEditing(false); handleSubmit()}} 
  variant='outlined'
  className=' normal-case h-10 text-nowrap bg-black text-white font-semibold rounded-[30px] hover:bg-transparent hover:text-black border-black transition-all'>
  <span><FaSave className='text-sm mr-1'/></span>Save Changes
</Button>
)}
</Box>
 
{/* ----------------- PROFILE FORM --------------------------- */}

<Box className="mx-6 md:mx-12">

{/* -------------------------- PERSONAL INFORMATION --------------------------- */}
{/* -------------------------- PERSONAL INFORMATION --------------------------- */}
{/* -------------------------- PERSONAL INFORMATION --------------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Personal Information
</Typography>

{/* ----------------- PROFILE PHOTOS AND GENDER ----------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-8">

{/* ----------------------- PROFILE PHOTOS ------------------ */}

{fetchLoading ? (
  <Box className="w-full flex items-center h-24 justify-center">
  <CircularProgress size={30} className='text-black'/>
  </Box>
) : (
  <Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap justify-around"> 
{/* ----------------- PROFILE PHOTO 1 ---------------------- */}
{photo1Loading ? (
  <Box className="flex items-center h-24 w-20">
  <CircularProgress size={30} className='text-black'/>
  </Box>
) : (
  <Box>
<Badge
color="info"
overlap="circular"
className="cursor-pointer"
badgeContent={<MdEdit className='text-sm' />}
anchorOrigin={{
vertical: "bottom",
horizontal: "right",
}}
onClick={() => Photo1.current.click()} 
>
<Avatar 
src={profileData.consultProfilePhoto1}
onClick={(e) => e.stopPropagation()}
className='h-20 sm:h-24 sm:w-24 w-20'/>
</Badge>
<input
type="file"
ref={Photo1}
className="hidden"
onChange={(e) => setPhoto1(e.target.files[0])}
disabled={!isEditing}
/>
</Box>
)}
{/* ----------------- PROFILE PHOTO 2 ---------------------- */}
{photo2Loading ? (
  <Box className="flex items-center h-24 w-20">
  <CircularProgress size={30} className='text-black'/>
  </Box>
) : (
<Box>
<Badge
color="info"
overlap="circular"
className="cursor-pointer"
badgeContent={<MdEdit className='text-sm' />}
anchorOrigin={{
vertical: "bottom",
horizontal: "right",
}}
onClick={() => Photo2.current.click()} 
>
<Avatar 
src={profileData.consultProfilePhoto2}
onClick={(e) => e.stopPropagation()}
className='h-20 sm:h-24 sm:w-24 w-20'/>
</Badge>
<input
type="file"
ref={Photo2}
className="hidden"
onChange={(e) => setPhoto2(e.target.files[0])}
disabled={!isEditing}
/>
</Box>
)}
{/* ----------------- PROFILE PHOTO 3 ---------------------- */}
{photo3Loading ? (
  <Box className="flex items-center h-24 w-20">
  <CircularProgress size={30} className='text-black'/>
  </Box>
) : (
<Box>
<Badge
color="info"
overlap="circular"
className="cursor-pointer"
badgeContent={<MdEdit className='text-sm' />}
anchorOrigin={{
vertical: "bottom",
horizontal: "right",
}}
onClick={() => Photo3.current.click()} 
>
<Avatar 
src={profileData.consultProfilePhoto3}
onClick={(e) => e.stopPropagation()}
className='h-20 sm:h-24 sm:w-24 w-20'/>
</Badge>
<input
type="file"
ref={Photo3}
className="hidden"
onChange={(e) => setPhoto3(e.target.files[0])}
disabled={!isEditing}
/>
</Box>
)}
</Box>
)}

{/* ----------------------- GENDER -------------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Gender</Typography>
<FormControl fullWidth variant="outlined" className="mb-5 bg-gray-100 rounded-lg" disabled={!isEditing}>
  <InputLabel>Gender</InputLabel>
  <Select
    value={profileData.consultGender}
    onChange={handleChange}
    name="consultGender"
    label="Gender"
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
  >
    <MenuItem value="male">Male</MenuItem>
    <MenuItem value="female">Female</MenuItem>
    <MenuItem value="other">Other</MenuItem>
  </Select>
</FormControl>
</Box>
</Box>

{/* --------------------- NAME AND DOB -------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-4">
<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Full Name</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.name}
onChange={handleChange}
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
</Box>

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Date of Birth</Typography>
<TextField
type="date"
disabled={!isEditing}
value={profileData.consultDOB}
onChange={handleChange}
required
fullWidth
variant="outlined"
name="consultDOB"
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

{/* ---------------------- ADDRESS  ------------------------ */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Address</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultAddress}
onChange={handleChange}
required
placeholder="Enter your Address"
variant="outlined"
name="consultAddress"
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

{/* ---------------- COUNTRY and POSTAL CODE ------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Country</Typography>
<Autocomplete
disabled={!isEditing}
options={Countries}
value={profileData.consultCountry}
onChange={(event, value) => setProfileData((prev) => ({
  ...prev,
  consultCountry: value, 
}))}
disablePortal
PopperComponent={CustomPopper}
className="w-full"
renderTags={(value, getTagProps) =>
value.map((option, index) => (
<Chip
key={index}
label={option}
{...getTagProps({ index })}
className="bg-gray-500 text-white rounded-md px-2 py-1 m-1"
/>
))
}
renderInput={(params) => (
<TextField
{...params}
label="Select Country"
placeholder="Search Country"
className="w-full bg-gray-100 rounded-lg"
/>
)}
/>
</Box>

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Postal Code</Typography>
<TextField
type="number"
placeholder='Enter your postal code here'
disabled={!isEditing}
value={profileData.consultPostalCode}
onChange={handleChange}
required
fullWidth
variant="outlined"
name="consultPostalCode"
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

{/* ------------------ ABOUT SECTION -------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">About Section</Typography>
<TextField
multiline
rows={2}
type="text"
disabled={!isEditing}
value={profileData.consultAbout}
onChange={handleChange}
required
placeholder="Enter here"
variant="outlined"
name="consultAbout"
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

{/* ------------------ DESCRIPTION SECTION SECTION -------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Description Section</Typography>
<TextField
multiline
rows={4}
type="text"
disabled={!isEditing}
value={profileData.consultDescription}
onChange={handleChange}
required
placeholder="Enter your Description here"
variant="outlined"
name="consultDescription"
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

<Box className="border-gray-300 border-[0.5px] mt-6 mb-6 sm:mb-0"></Box>

{/* --------------------------- CONTACT INFORMATION --------------------------- */}
{/* --------------------------- CONTACT INFORMATION --------------------------- */}
{/* --------------------------- CONTACT INFORMATION --------------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Contact Information
</Typography>

{/* ----------------- MOBILE NUMBER and GITHUB LINK ----------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-4">
<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Phone Number</Typography>
<TextField
type="number"
disabled={!isEditing}
value={profileData.consultPhoneNumber}
onChange={handleChange}
required
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
</Box>

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Github Link</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultGitHub}
onChange={handleChange}
placeholder='Enter your Github Account Link (Optional)'
fullWidth
variant="outlined"
name="consultGitHub"
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

{/* ------------------- LINKEDIN URL -------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Linkedin</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultLinkedin}
onChange={handleChange}
required
placeholder="Enter your Linkedin URL"
variant="outlined"
name="consultLinkedin"
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

{/* --------------  YT and INSTAGRAM URL ------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Youtube</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultYT}
onChange={handleChange}
required
placeholder="Enter your Youtube Channel Link (Optional)"
variant="outlined"
name="consultYT"
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
<Typography className="text-black font-semibold mb-1">Instagram Link</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultInstagram}
onChange={handleChange}
placeholder='Enter your Instagram Account Link (Optional)'
fullWidth
variant="outlined"
name="consultInstagram"
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

</Box>

<Box className="border-gray-300 border-[0.5px] mt-6 mb-6 sm:mb-0"></Box>

{/* ---------------------- COLLEGE and ACADEMICS DETAILS ---------------------- */}
{/* ---------------------- COLLEGE and ACADEMICS DETAILS ---------------------- */}
{/* ---------------------- COLLEGE and ACADEMICS DETAILS ---------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  College & Academic Details
</Typography>

{/* --------------- COLLEGE ID and COLLEGE NAME ----------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-8">

{fetchLoading || collegeIDLoading ? (
  <Box className="w-full flex gap-2 items-center h-24 flex-wrap sm:flex-nowrap justify-around">
  <CircularProgress size={30} className='text-black'/>
  </Box>
) : profileData.consultCollegeID ? (
  <Box className="flex justify-center items-center w-full my-6">
  <Typography className='text-green-500 font-bold text-lg sm:text-xl'>
    College ID Uploaded <span className='inline-block'><MdDone className='font-bold'/></span>
  </Typography>
  </Box>
) : (
<Box className="flex justify-center w-full">
<Badge
color="info"
overlap="circular"
className="cursor-pointer"
badgeContent={<MdEdit className='text-sm' />}
anchorOrigin={{
vertical: "bottom",
horizontal: "right",
}}
onClick={() => CollegeID.current.click()} 
>
<Avatar 
src={profileData.consultCollegeID}
onClick={(e) => e.stopPropagation()}
className='h-20 sm:h-24 sm:w-24 w-20'/>
</Badge>
<input
type="file"
ref={CollegeID}
className="hidden"
onChange={(e) => setCollegeID(e.target.files[0])}
disabled={!isEditing}
/>
</Box>
)}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">College Name</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultCollegeName}
onChange={handleChange}
required
placeholder="Enter your College Name"
variant="outlined"
name="consultCollegeName"
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

{/* ------------ UNIVERSITY NAME and COLLEGE MAJOR -------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">University Name</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultUniversityName}
onChange={handleChange}
required
placeholder="Enter your University Name"
variant="outlined"
name="consultUniversityName"
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
<Typography className="text-black font-semibold mb-1">College Major</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultCollegeMajor}
onChange={handleChange}
placeholder="Enter your College Major"
variant="outlined"
name="consultCollegeMajor"
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

{/* -------------- EXAMS TAKEN and DATE OF ADMISSION ------------------ */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">

<Box className="w-full mb-4">
<Typography className="text-black font-semibold mb-1">Exams Given (If Any)</Typography>
<Autocomplete
  multiple
  disabled={!isEditing}
  options={Examsss}
  value={profileData.consultExamsGiven || []}
  onChange={(event, value) => 
    setProfileData((prev) => ({
      ...prev,
      consultExamsGiven: [...value], 
    }))
  }
  disablePortal
  PopperComponent={CustomPopper}
  className="w-full"
  renderTags={(value, getTagProps) =>
    value.map((option, index) => (
      <Chip
        key={option}
        label={option}
        {...getTagProps({ index })}
        className="bg-gray-500 text-white rounded-md px-2 py-1 m-1"
      />
    ))
  }
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Exams"
      placeholder="Search Exams"
      className="w-full bg-gray-100 rounded-lg"
    />
  )}
/>

</Box>

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Date of Admission (College)</Typography>
<TextField
type="date"
disabled={!isEditing}
value={profileData.consultAdmissionDate}
onChange={handleChange}
required
fullWidth
variant="outlined"
name="consultAdmissionDate"
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

</Box>

<Box className="border-gray-300 border-[0.5px] mt-6 mb-6 sm:mb-0"></Box>

{/* ---------------------- FINANCIAL INFORMATION ---------------------- */}
{/* ---------------------- FINANCIAL INFORMATION ---------------------- */}
{/* ---------------------- FINANCIAL INFORMATION ---------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Financial Information
</Typography>

{/* ----------------- FEES PER SEM and MONTHLY EXPENSES -------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-8">

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Fees per Sem (in $)</Typography>
<TextField
type="number"
disabled={!isEditing}
value={profileData.consultSemFees}
onChange={handleChange}
placeholder="Enter Fees Per Sem"
variant="outlined"
name="consultSemFees"
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
<Typography className="text-black font-semibold mb-1">Monthly Expenses (in $)</Typography>
<TextField
type="number"
disabled={!isEditing}
value={profileData.consultMonthlyExpenses}
onChange={handleChange}
placeholder="Enter your Monthly Expenses"
variant="outlined"
name="consultMonthlyExpenses"
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

{/* ----------------- LOAN FROM BANK FOR COLLEGE ----------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Loan from bank for College (If Any) (in $)</Typography>
<TextField
type="number"
disabled={!isEditing}
value={profileData.consultBankLoan}
onChange={handleChange}
placeholder="Enter Bank Loan Ammount (in $)"
variant="outlined"
name="consultBankLoan"
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

<Box className="border-gray-300 border-[0.5px] mt-6 mb-6 sm:mb-0"></Box>

{/* ---------------------- BANKING DETAILS ---------------------- */}
{/* ---------------------- BANKING DETAILS ---------------------- */}
{/* ---------------------- BANKING DETAILS ---------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Bank Details
</Typography>

{/* --------------- ACCOUNT NUMBER & ACCOUNT HOLDER NAME --------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap md:mt-8">

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Bank Account Number</Typography>
<TextField
type="number"
disabled={!isEditing}
value={profileData.consultBankAccNumber}
onChange={handleChange}
placeholder="Enter Bank Account Number"
variant="outlined"
name="consultBankAccNumber"
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
<Typography className="text-black font-semibold mb-1">Bank Account Holder Name</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultBankAccHolderName}
onChange={handleChange}
placeholder="Enter Bank Account Holder Name"
variant="outlined"
name="consultBankAccHolderName"
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

{/* ----------------- IAN NUMBER & SWIFT CODE ------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">IAN Number</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultBankIANnumber}
onChange={handleChange}
placeholder="Enter your IAN Number"
variant="outlined"
name="consultBankIANnumber"
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
<Typography className="text-black font-semibold mb-1">Swift Code</Typography>
<TextField
type="text"
disabled={!isEditing}
value={profileData.consultBankSwiftCode}
onChange={handleChange}
placeholder="Enter your Swift Code"
variant="outlined"
name="consultBankSwiftCode"
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

</Box>

{/* -------------------- PROFILE FORM END -------------------- */}

</Box>

{/*-------------------- Snackbar for messages ---------------------*/}

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