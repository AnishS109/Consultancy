import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import StudentHome from '../StudentHome'
import { Autocomplete, Avatar, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Popper, Snackbar, Alert, CircularProgress, Badge } from '@mui/material'
import { FaUserEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { DataContext } from '../../Context/DataProvider';

import EditIcon from "@mui/icons-material/Edit";
import { MdEdit } from "react-icons/md";


export const DashProfileContent = () => {

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

  const Degreesss = [
    // Associate Degrees
    "Associate of Arts (AA)",
    "Associate of Science (AS)",
    "Associate of Applied Science (AAS)",
    "Associate of Business Administration (ABA)",
    "Associate of Fine Arts (AFA)",
    "Associate of Engineering (AE)",
    "Associate of Nursing (ADN)",
  
    // Bachelor's Degrees
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BS)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Engineering (BEng)",
    "Bachelor of Technology (BTech)",
    "Bachelor of Laws (LLB)",
    "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    "Bachelor of Dental Surgery (BDS)",
    "Bachelor of Architecture (BArch)",
    "Bachelor of Education (BEd)",
    "Bachelor of Pharmacy (BPharm)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Information Technology (BIT)",
    "Bachelor of Social Work (BSW)",
    "Bachelor of Nursing (BSN)",
    "Bachelor of Hospitality Management (BHM)",
    "Bachelor of Public Administration (BPA)",
    "Bachelor of Science in Engineering (BScEng)",
    "Bachelor of Science in Nursing (BSN)",
    "Bachelor of Science in Psychology (BScPsych)",
    "Bachelor of Accounting and Finance (BAF)",
    "Bachelor of Communication (BComm)",
    "Bachelor of Political Science (BPS)",
    "Bachelor of Agricultural Science (BASc)",
    "Bachelor of Environmental Science (BES)",
    "Bachelor of Theology (BTh)",
    "Bachelor of Social Sciences (BSS)",
    "Bachelor of Music (BMus)",
  
    // Master's Degrees
    "Master of Arts (MA)",
    "Master of Science (MS)",
    "Master of Business Administration (MBA)",
    "Master of Engineering (MEng)",
    "Master of Technology (MTech)",
    "Master of Laws (LLM)",
    "Master of Education (MEd)",
    "Master of Pharmacy (MPharm)",
    "Master of Computer Applications (MCA)",
    "Master of Information Technology (MIT)",
    "Master of Public Health (MPH)",
    "Master of Social Work (MSW)",
    "Master of Finance (MFin)",
    "Master of Accounting (MAcc)",
    "Master of Architecture (MArch)",
    "Master of Fine Arts (MFA)",
    "Master of Journalism (MJ)",
    "Master of Public Administration (MPA)",
    "Master of Political Science (MPS)",
    "Master of Environmental Science (MES)",
    "Master of Public Policy (MPP)",
    "Master of International Business (MIB)",
    "Master of Health Administration (MHA)",
    "Master of Theology (MTh)",
    "Master of Library Science (MLS)",
    "Master of Music (MMus)",
  
    // Doctoral Degrees (PhD, Professional, and Research-Based)
    "Doctor of Philosophy (PhD)",
    "Doctor of Medicine (MD)",
    "Doctor of Dental Surgery (DDS)",
    "Doctor of Dental Medicine (DMD)",
    "Doctor of Education (EdD)",
    "Doctor of Pharmacy (PharmD)",
    "Doctor of Business Administration (DBA)",
    "Doctor of Law (JD)",
    "Doctor of Veterinary Medicine (DVM)",
    "Doctor of Theology (ThD)",
    "Doctor of Engineering (DEng)",
    "Doctor of Social Work (DSW)",
    "Doctor of Nursing Practice (DNP)",
    "Doctor of Public Health (DrPH)",
    "Doctor of Musical Arts (DMA)",
    "Doctor of Psychology (PsyD)",
  
    // Professional Degrees
    "Bachelor of Medicine (BM)",
    "Bachelor of Surgery (BS)",
    "Master of Laws (LLM)",
    "Master of Business Administration (MBA)",
    "Master of Divinity (MDiv)",
    "Master of Health Science (MHS)",
    "Master of Science in Nursing (MSN)",
    "Master of Engineering Management (MEM)",
    "Master of Public Policy (MPP)",
    "Master of Urban Planning (MUP)",
  
    // Diplomas & Certificates
    "Postgraduate Diploma (PGDip)",
    "Graduate Certificate (GradCert)",
    "Graduate Diploma (GradDip)",
    "Advanced Diploma (AdvDip)",
    "Certificate in Education (CertEd)"
  ];

  const Colleges = [
    // United States
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology (MIT)",
    "California Institute of Technology (Caltech)",
    "University of Chicago",
    "Princeton University",
    "Columbia University",
    "Yale University",
    "University of Pennsylvania",
    "Johns Hopkins University",
    "University of California, Berkeley (UC Berkeley)",
    "University of California, Los Angeles (UCLA)",
    "University of Michigan",
    "Duke University",
    "Cornell University",
    "Northwestern University",
    "New York University (NYU)",
    "Carnegie Mellon University",
    "University of Southern California (USC)",
    "University of Texas at Austin",
  
    // United Kingdom
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "London School of Economics and Political Science (LSE)",
    "University College London (UCL)",
    "University of Edinburgh",
    "King’s College London",
    "University of Manchester",
    "University of Glasgow",
    "University of Bristol",
  
    // Canada
    "University of Toronto",
    "University of British Columbia (UBC)",
    "McGill University",
    "University of Alberta",
    "University of Waterloo",
    "Western University",
    "McMaster University",
    "University of Montreal",
    "Queen’s University",
    "Simon Fraser University",
  
    // Australia
    "Australian National University (ANU)",
    "University of Melbourne",
    "University of Sydney",
    "University of Queensland",
    "University of New South Wales (UNSW)",
    "Monash University",
    "University of Western Australia",
    "University of Adelaide",
    "Macquarie University",
    "Queensland University of Technology (QUT)",
  
    // Germany
    "Technical University of Munich",
    "Ludwig Maximilian University of Munich",
    "Heidelberg University",
    "Humboldt University of Berlin",
    "University of Freiburg",
    "RWTH Aachen University",
    "University of Stuttgart",
    "University of Hamburg",
    "University of Bonn",
    "Dresden University of Technology",
  
    // France
    "Sorbonne University",
    "École Normale Supérieure (ENS Paris)",
    "École Polytechnique",
    "Sciences Po",
    "Université PSL",
    "HEC Paris",
    "Paris-Saclay University",
    "University of Strasbourg",
    "Aix-Marseille University",
    "Université Grenoble Alpes",
  
    // China
    "Tsinghua University",
    "Peking University",
    "Fudan University",
    "Shanghai Jiao Tong University",
    "Zhejiang University",
    "Nanjing University",
    "Sun Yat-sen University",
    "Wuhan University",
    "Xi’an Jiaotong University",
    "Harbin Institute of Technology",
  
    // Japan
    "University of Tokyo",
    "Kyoto University",
    "Osaka University",
    "Tohoku University",
    "Nagoya University",
    "Tokyo Institute of Technology",
    "Hokkaido University",
    "Kyushu University",
    "University of Tsukuba",
    "Keio University",
  
    // Singapore
    "National University of Singapore (NUS)",
    "Nanyang Technological University (NTU)",
  
    // South Korea
    "Seoul National University",
    "Korea University",
    "Yonsei University",
    "Pohang University of Science and Technology (POSTECH)",
    "KAIST - Korea Advanced Institute of Science & Technology",
  
    // India
    "Indian Institute of Technology Bombay (IIT Bombay)",
    "Indian Institute of Technology Delhi (IIT Delhi)",
    "Indian Institute of Technology Madras (IIT Madras)",
    "Indian Institute of Science (IISc Bangalore)",
    "Indian Institute of Technology Kanpur (IIT Kanpur)",
    "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
    "University of Delhi",
    "Jawaharlal Nehru University (JNU)",
    "Birla Institute of Technology and Science (BITS Pilani)",
  
    // Netherlands
    "University of Amsterdam",
    "Delft University of Technology",
    "Utrecht University",
    "Leiden University",
    "Eindhoven University of Technology",
  
    // Switzerland
    "ETH Zurich - Swiss Federal Institute of Technology",
    "École Polytechnique Fédérale de Lausanne (EPFL)",
    "University of Zurich",
    "University of Geneva",
    "University of Basel",
  
    // Sweden
    "Karolinska Institute",
    "Lund University",
    "Uppsala University",
    "Stockholm University",
    "KTH Royal Institute of Technology",
  
    // Other Top Universities
    "National Autonomous University of Mexico (UNAM)",
    "University of Buenos Aires",
    "University of São Paulo",
    "University of Cape Town",
    "University of the Philippines",
    "University of Hong Kong",
    "Hong Kong University of Science and Technology",
    "University of Copenhagen",
    "University of Oslo",
    "University of Helsinki",
    "University of Vienna",
    "Trinity College Dublin",
    "University of Auckland",
    "University of Otago"
  ];
  
  
  const Countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
    "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", 
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
    "Estonia", "Eswatini (Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", 
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
    "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
    "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", 
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const fileInputRef = useRef(null); 
  const { backendUrl, account } = useContext(DataContext)

// ------------------- USE STATES ---------------------

 const [toggle, setToggle] = useState(false)
 const [updateLoader, setUpdateLoader] = useState(false)
 const [fetchLoader, setFetchLoader] = useState(false)
 const [profileImage, setProfileImage] = useState("")
 const [quali, setQuali] = useState("")
 const [error, setError] = useState(false)
 const [imageLoading, setImageLoading] = useState(false)
 const [messageModal, setMessageModal] = useState({
  open: false,
  message: "",
  severity: "",
});
 const [profileData, setProfileData] = useState({
  _id: "",
  name:"",
  email:"",
  studentDOB:"",
  studentGender:"male",
  studentPhoto:"",
  studentNumber:"",
  studentAddress:"",
  studentExamsTaken:[],
  studentDegreeInterested:[],
  studentfather:"",
  studentMother:"",
  studentFatherOccu:"",
  studentCollegeInterested:[],
  studentCountryInterested:[],
  studentSchoolName:"",
  studentGraduateCollegeName:"",
  studentGraduateCollegeDegreeName:"",
  studentGraduateCollegeSpecialisation:"",
  studentGraduateCollegeYear:"",
  studentPostCollegeName:"",
  studentPostCollegeDegreeName:"",
  studentPostCollegeSpecialisation:"",
 })

// ------------------ FOR DOWNWARDING AUTOCOMPLETE --------------------

const CustomPopper = (props) => (
  <Popper
    {...props}
    className="z-50 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300"
  />
);

// ------------------- HANDLE TOGGLING ---------------------

const handleToggling = () => {
  if(!error){
    setToggle((prev) => !prev)
  }
}

// ---------------- HANDLING AVATAR CLICK ------------------

const handleAvatarClick = () => {
  fileInputRef.current.click();
};

// --------------- HANDLING CHANGES ------------------

const ProfilehandleChange = (e) => {
  const {name, value} = e.target
  setProfileData({...profileData, [name]:value})
}

// ---------------- HANDLE FORM SUBMIT ---------------

const handleSubmit = async() => {
  setUpdateLoader(true)

  if (!profileData.name.trim()) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Full Name is required", open: true, severity: "error" });
    return;
  }

  if (!profileData.email.trim()) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Email is required", open: true, severity: "error" });
    return;
  } else if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Invalid email format", open: true, severity: "error" });
    return;
  }

  if (!profileData.studentDOB) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Date of Birth is required", open: true, severity: "error" });
    return;
  }

  if (!profileData.studentGender) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Gender is required", open: true, severity: "error" });
    return;
  }

  if (!profileData.studentNumber) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Mobile number is required", open: true, severity: "error" });
    return;
  } else if (!/^\d{10}$/.test(profileData.studentNumber)) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Mobile number must be 10 digits", open: true, severity: "error" });
    return;
  }

  if (!profileData.studentAddress.trim()) {
    setError(true)
    setUpdateLoader(false)
    setMessageModal({ message: "Address is required", open: true, severity: "error" });
    return;
  }

  try {
    const response = await axios.post(`${backendUrl}/Student/Updating/Student/Profile`, profileData)
    if(response.status === 200){
      setMessageModal({open:true, message:response?.data?.message || "Check Your Conntection! Try Again Later", severity:"success"});
    }
  } catch (error) {
    setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"});
  } finally {
    setUpdateLoader(false)
  }
};

// --------------- FETCHING PROFILE DATA -------------

useEffect(() => {
  const fetchingProfile = async() => {
    const serverData = {email:account.email, role:account.role}
    setFetchLoader(true)
    try {
      const response = await axios.get(`${backendUrl}/Student/Fetching/Student/Profile`, {
        params: serverData
      })
      if(response.status === 200){
        const data = response.data
        setProfileData({
          ...data,
          studentGender: data.studentGender || "male",
          studentDOB: data.studentDOB ? data.studentDOB.split("T")[0] : "",  // Convert to YYYY-MM-DD
        });
      }
    } catch (error) {
      setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"});
    } finally {
      setFetchLoader(false)
    }
  }
  fetchingProfile()
},[])

// ----------------  SAVING IMAGE TO STUDENT PROFILE -----------------

const UploadImage = async(img) => {
  const serverResponse = {
    email:account.email,
    role:account.role,
    img:img,
  }

  try {
    const response = await axios.post(`${backendUrl}/Student/Image-Saved-to-Student`, serverResponse, {
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
    setProfileImage("")
  }
}

// -----------------  UPLOADING IMAGE TO DATABSE -----------------

const handleImageUpload = async() => {
  if(profileImage === ""){return}
  const formdata = new FormData();
  formdata.append("file", profileImage)
  formdata.append("role", account.role);
  setImageLoading(true)
  try {
    const response = await axios.post(`${backendUrl}/Student/Profle-Image-Upload-Database`, formdata,  {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
    if(response.status === 200){
      const imageUrl = `${backendUrl}/Student/file/${response.data}`
      await UploadImage(imageUrl); 
    }
  } catch (error) {
    setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
  } finally {
    setImageLoading(false)
  }
}

useEffect(() => {
  if (profileImage !== "") {
    handleImageUpload();
  }
}, [profileImage]);

  return (
<>
{/* --------------------------- PROFILE HEADER -------------------------------- */}

<Box className="h-24 sticky top-0 z-10 bg-white border-b-2 w-[100%] flex justify-between items-center">
<Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10 text-nowrap'>
 Profile
</Typography>

{!toggle ? (
<Button
onClick={() => setToggle((prev) => !prev)}
className='h-fit px-4 py-2 text-black border-black normal-case font-semibold rounded-[20px] hover:bg-black hover:text-white transition-all mr-6'
variant='outlined'>
<span><FaUserEdit className='text-lg mr-1'/></span>Edit Changes
</Button>
) : updateLoader ? (
  <CircularProgress size={28} className='mr-16 text-black'/>
) : (
  <Button
onClick={() => {handleToggling(); handleSubmit()}}
className='h-fit px-4 py-2 text-black border-black normal-case font-semibold rounded-[20px] hover:bg-black hover:text-white transition-all mr-6'
variant='outlined'>
<span><FaSave className='text-lg mr-1'/></span>Save Changes
</Button>
)}
</Box>

{/* ----------------------------- PROFILE FORM -------------------------------- */}

<Box className="mx-6 md:mx-16">

{/* -------------------------- PERSONAL INFORMATION --------------------------- */}
{/* -------------------------- PERSONAL INFORMATION --------------------------- */}
{/* -------------------------- PERSONAL INFORMATION --------------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Personal Information
</Typography>

{/* --------------------- Profile Photo and Gender ---------------------------  */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">

<Box className="flex items-center w-full justify-center mt-3 sm:mt-0">
<Box className="flex items-center gap-2">
{fetchLoader ? (
<CircularProgress size={20} className='text-black'/>
) : imageLoading ? (
  <CircularProgress size={20} className='text-black'/>
) : (
<>
<Badge
color="info"
overlap="circular"
className="cursor-pointer"
badgeContent={<MdEdit className='text-sm' />}
anchorOrigin={{
vertical: "bottom",
horizontal: "right",
}}
onClick={handleAvatarClick} 
>
<Avatar 
src={profileData.studentPhoto}
onClick={(e) => e.stopPropagation()}
className='h-20 sm:h-24 sm:w-24 w-20'/>
</Badge>
<input
type="file"
ref={fileInputRef}
className="hidden"
onChange={(e) => setProfileImage(e.target.files[0])}
disabled={!toggle}
/>
</>)}
</Box>
</Box>

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Gender</Typography>
<FormControl fullWidth variant="outlined" className="mb-5 bg-gray-100 rounded-lg" disabled={!toggle}>
  <InputLabel>Gender</InputLabel>
  <Select
    value={profileData.studentGender || "male"}
    onChange={ProfilehandleChange}
    name="studentGender"
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

{/* --------------------- NAME and DOB -----------------------------------*/}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Full Name</Typography>
<TextField
type="text"
disabled={!toggle}
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
</Box>

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Date of Birth</Typography>
<TextField
type="date"
disabled={!toggle}
value={profileData.studentDOB}
onChange={ProfilehandleChange}
required
fullWidth
variant="outlined"
name="studentDOB"
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

{/* --------------------------- CONTACT INFORMATION --------------------------- */}
{/* --------------------------- CONTACT INFORMATION --------------------------- */}
{/* --------------------------- CONTACT INFORMATION --------------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Contact Information
</Typography>

{/* ------------------------- EMAIL and MOBILE NUMBER ------------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Email</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.email}
onChange={ProfilehandleChange}
required
placeholder="Enter your email"
variant="outlined"
name="email"
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
<Typography className="text-black font-semibold mb-1">Phone Number</Typography>
<TextField
type="number"
disabled={!toggle}
value={profileData.studentNumber}
onChange={ProfilehandleChange}
required
placeholder="Enter your Phone Number"
variant="outlined"
name="studentNumber"
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

{/* --------------------------- CURRENT ADDRESS ------------------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Address</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentAddress}
onChange={ProfilehandleChange}
required
placeholder="Enter your Address"
variant="outlined"
name="studentAddress"
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

<Box className="border-gray-300 border-[0.5px] mt-6 mb-6 sm:mb-6"></Box>

{/* ------------------------ EDUCATIONAL INFORMATION -------------------------- */}
{/* ------------------------ EDUCATIONAL INFORMATION -------------------------- */}
{/* ------------------------ EDUCATIONAL INFORMATION -------------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-4">
  Educational Information
</Typography>

{/* ------------------------ Qualification --------------------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Qualification</Typography>
<FormControl fullWidth variant="outlined" className="mb-5 bg-gray-100 rounded-lg" disabled={!toggle}>
  <InputLabel>Qualification</InputLabel>
  <Select
    value={quali}
    onChange={(e) => setQuali(e.target.value)}
    name="gender"
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
    <MenuItem value="School">School</MenuItem>
    <MenuItem value="Graduating">Graduating</MenuItem>
    <MenuItem value="Graduated">Graduated</MenuItem>
    <MenuItem value="Post-Graduate">Post-Graduate</MenuItem>
  </Select>
</FormControl>
</Box>

{/* -------------------------- SCHOOL NAME --------------------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
{["School", "Graduating", "Graduated", "Post-Graduate"].includes(quali)  ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">School Name</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentSchoolName}
onChange={ProfilehandleChange}
required
placeholder="Enter your school name"
variant="outlined"
name="studentSchoolName"
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
}}
/>
</Box>
) : null}

{/* ---------------------- GRADUATE COLLEGE NAME -------------------------- */}

{["Graduating", "Graduated", "Post-Graduate"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">
  {quali === "Graduating" ? ("Graduating College Name") : ("Graduate College Name")}
</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentGraduateCollegeName}
onChange={ProfilehandleChange}
required
placeholder="Enter your College Name"
variant="outlined"
name="studentGraduateCollegeName"
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
}}
/>
</Box>
) : ( null)}
</Box>

{/* ------------------- GRADUATE COLLEGE DEGREE NAME ---------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
{["Graduating", "Graduated", "Post-Graduate"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">
  {quali === "Graduating" ? ("Graduating Degree Name") : ("Graduate Degree Name")}
</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentGraduateCollegeDegreeName}
onChange={ProfilehandleChange}
required
placeholder="Enter your College Degree Name"
variant="outlined"
name="studentGraduateCollegeDegreeName"
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
}}
/>
</Box>
) : ( null)}

{/* ------------------- GRADUTE COLLEGE SPECIALISATION ----------- */}

{["Graduating", "Graduated", "Post-Graduate"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">Specialisation Name</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentGraduateCollegeSpecialisation}
onChange={ProfilehandleChange}
required
placeholder="Enter your Specialisation"
variant="outlined"
name="studentGraduateCollegeSpecialisation"
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
}}
/>
</Box>
) : ( null)}
</Box>

{/* ---------------------- CURRENT YEAR -------------------------- */}

{["Graduating"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">Current Year</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentGraduateCollegeYear}
onChange={ProfilehandleChange}
required
placeholder="Enter your College Degree Name"
variant="outlined"
name="studentGraduateCollegeYear"
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
}}
/>
</Box>
) : ( null)}

{/* ------------------------ POST COLLEGE NAME -------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
{["Post-Graduate"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">Post Gradaute College Name</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentPostCollegeName}
onChange={ProfilehandleChange}
required
placeholder="Enter your College Name"
variant="outlined"
name="studentPostCollegeName"
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
}}
/>
</Box>
) : ( null)}

{/* -------------------------- POST DEGREE NAME -------------------- */}

{["Post-Graduate"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">Post Gradaute Degree Name</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentPostCollegeDegreeName}
onChange={ProfilehandleChange}
required
placeholder="Enter your Degree Name"
variant="outlined"
name="studentPostCollegeDegreeName"
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
}}
/>
</Box>
) : ( null)}
</Box>

{/* ------------------------ POST SPEALISATION --------------------- */}

{["Post-Graduate"].includes(quali) ? (
<Box className="w-full sm:w-1/2">
<Typography className="text-black font-semibold mb-1">Post Gradaute Specialisation</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentPostCollegeSpecialisation}
onChange={ProfilehandleChange}
required
placeholder="Enter your Degree Name"
variant="outlined"
name="studentPostCollegeSpecialisation"
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
}}
/>
</Box>
) : ( null)}

{/* --------------------------- EXAMS TAKEN ------------------------- */}

<Box className="w-full mb-4">
<Typography className="text-black font-semibold mb-1">Exams Given (If Any)</Typography>
<Autocomplete
  multiple
  disabled={!toggle}
  options={Examsss}
  value={profileData.studentExamsTaken || []}
  onChange={(event, value) => 
    setProfileData((prev) => ({
      ...prev,
      studentExamsTaken: [...value], 
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

{/* -------------------------- DEGREE INTERESTED -------------------- */}

<Box className="w-full mb-4">
<Typography className="text-black font-semibold mb-1">Degree Interested In</Typography>
<Autocomplete
disabled={!toggle}
multiple
options={Degreesss}
value={profileData.studentDegreeInterested}
onChange={(event, value) => setProfileData((prev) => ({
  ...prev,
  studentDegreeInterested: value, 
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
label="Select Degree"
placeholder="Search Degree"
className="w-full bg-gray-100 rounded-lg"
/>
)}
/>
</Box>
</Box>

<Box className="border-gray-300 border-[0.5px] mt-10 mb-6 sm:mb-6"></Box>

{/* -------------------------- FAMILY INFORMATION ----------------------------- */}
{/* -------------------------- FAMILY INFORMATION ----------------------------- */}
{/* -------------------------- FAMILY INFORMATION ----------------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  Family Information
</Typography>

{/* ----------------------- FATHER and MOTHER NAME ---------------------------- */}

<Box className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Father's Name</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentfather}
onChange={ProfilehandleChange}
required
placeholder="Enter your Father Name"
variant="outlined"
name="studentfather"
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
<Typography className="text-black font-semibold mb-1">Mother's Name</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentMother}
onChange={ProfilehandleChange}
required
placeholder="Enter your Mother Name"
variant="outlined"
name="studentMother"
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

{/* ------------------------- FATHER OCCUPATION ------------------------------- */}

<Box className="w-full">
<Typography className="text-black font-semibold mb-1">Father's Occupation</Typography>
<TextField
type="text"
disabled={!toggle}
value={profileData.studentFatherOccu}
onChange={ProfilehandleChange}
required
placeholder="Enter your Father Occupation"
variant="outlined"
name="studentFatherOccu"
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

<Box className="border-gray-300 border-[0.5px] mt-6 mb-6 sm:mb-6"></Box>

{/* ---------------------- COLLEGE and COUNTRY PREFERENCE --------------------- */}
{/* ---------------------- COLLEGE and COUNTRY PREFERENCE --------------------- */}
{/* ---------------------- COLLEGE and COUNTRY PREFERENCE --------------------- */}

<Box>
<Typography className="text-black font-semibold mb-3 sm:mb-5 text-2xl sm:text-3xl mt-2 sm:mt-8">
  College & Country Preferences
</Typography>

{/* ------------------------ COLLEGE INTERESTED ------------------------------ */}

<Box className="w-full mb-4">
<Typography className="text-black font-semibold mb-1">College Interested</Typography>
<Autocomplete
multiple
disabled={!toggle}
options={Colleges}
value={profileData.studentCollegeInterested}
onChange={(event, value) => setProfileData((prev) => ({
  ...prev,
  studentCollegeInterested: value, 
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
label="Select College"
placeholder="Search College"
className="w-full bg-gray-100 rounded-lg"
/>
)}
/>
</Box>

{/* -------------------------- COUNTRY INTERESTED ---------------------------- */}

<Box className="w-full mb-4">
<Typography className="text-black font-semibold mb-1">Country Interested</Typography>
<Autocomplete
multiple
disabled={!toggle}
options={Countries}
value={profileData.studentCountryInterested}
onChange={(event, value) => setProfileData((prev) => ({
  ...prev,
  studentCountryInterested: value, 
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

</Box>

</Box>

{/* ----------------------- SNACKBAR -------------------------- */}
{/* ----------------------- SNACKBAR -------------------------- */}
{/* ----------------------- SNACKBAR -------------------------- */}

<Snackbar
  open={messageModal.open}
  autoHideDuration={3000}
  onClose={() => setMessageModal(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setMessageModal(false)}
    severity={messageModal.severity}
    sx={{ width: "100%" }}
  >
    <b>{messageModal.message}</b>
  </Alert>
</Snackbar>

</>
)
}

// ------------------- Profile Routing ---------------------

const DashProfile = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashProfile