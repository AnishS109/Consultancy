import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import Navbar from '../Layout/NavBar'
import { DataContext } from "../Context/DataProvider"

import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const ConsultProfile = () => {
  
  const { backendUrl } = useContext(DataContext)
  const { id } = useParams()

// ------------------ USE STATES --------------------

  const [isSimilar, setIsSimilar] = useState(true)
  const [Category, setCategory] = useState("All")
  const [ConsultData, setConsultData] = useState({})
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)
  const [Email, setEmail] = useState("")
  const [ConsultAllData, setConsultAllData] = useState([])
  const [package1, setPackage1] = useState({
    name:"",
    des:"",
    mins:"",
    contactType:"Video Meeting",
    price:"",
    id:"",
    package:"Package1"
  })
  const [package2, setPackage2] = useState({
    name:"",
    des:"",
    mins:"",
    contactType:"Video Meeting",
    price:"",
    id:"",
    package:"Package2"
  })
  const [package3, setPackage3] = useState({
    name:"",
    des:"",
    mins:"",
    contactType:"Video Meeting",
    price:"",
    id:"",
    package:"Package3"
  })
  const [package4, setPackage4] = useState({
    name:"",
    des:"",
    mins:"",
    contactType:"Video Meeting",
    price:"",
    id:"",
    package:"Package4"
  })
  const [priorityDM, setPriorityDM] = useState({
    name:"",
    des:"",
    mins:"",
    contactType:"Priority",
    price:"",
    id:"",
    package:"PriorityDM"
  })

  // ------------ FETCHING CONSULTANT DATA ---------------

  useEffect(() => {
    setLoading(true)
    const fetchingData = async() => {
      try {
        const response = await axios.get(`${backendUrl}/Consult/Consult-Home-Profile-Section`,{
          params: {id}
        })

        if(response.status === 200){
          setConsultData(response.data)
          setEmail(response.data.email)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchingData()
  },[id, backendUrl])

  // -------------- FETCHING ALL CONSULTANT DATA ---------

  useEffect(() => {
    const fetchConsultant = async() => {
      try {
        const response = await axios.get(`${backendUrl}/Student/fetching-consultants`)
        if(response.status === 200){
          setConsultAllData(response.data)
        }
      } catch (error) {
      }
    }
    fetchConsultant()
  },[id,backendUrl,loading])

  // ---------------- FETCHING PACKAGE DATA -------------

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true)
      if(Email !== ""){
        const email = Email
        try {
          const response = await axios.get(`${backendUrl}/Consult/Fetching-Package-Details`, {
            params: { email }
          });
  
          if (response.status === 200) {
            if(response.data.Package1Description){
              setPackage1({...package1,
                name:response.data.Package1Title,
                des:response.data.Package1Description,
                mins:response.data.Package1Time,
                price:response.data.Package1Price,
                id:response.data._id
              })
            }
            if(response.data.Package2Description){
              setPackage2({...package2,
                name:response.data.Package2Title,
                des:response.data.Package2Description,
                mins:response.data.Package2Time,
                price:response.data.Package2Price,
                id:response.data._id
              })
            }
            if(response.data.Package3Description){
              setPackage3({...package3,
                name:response.data.Package3Title,
                des:response.data.Package3Description,
                mins:response.data.Package3Time,
                price:response.data.Package3Price,
                id:response.data._id
              })
            }
            if(response.data.Package4Description){
              setPackage4({...package4,
                name:response.data.Package4Title,
                des:response.data.Package4Description,
                mins:response.data.Package4Time,
                price:response.data.Package4Price,
                id:response.data._id
              })
            }
            if(response.data.PriorityDMDescription){
              setPriorityDM({...priorityDM,
                name:response.data.PriorityDMTitle,
                des:response.data.PriorityDMDescription,
                mins:response.data.PriorityDMTime,
                price:response.data.PriorityDMPrice,
                id:response.data._id
              })
            }
          }
        } catch (error) {
          // setMessageModal({open:true, message:error.response?.data?.message || "Check Your Conntection! Try Again Later", severity:"error"})
        } finally {
          setLoad(false)
        }
      }
    };

    fetchData();
  }, [loading])

  return (
<>
  <Navbar/>

{/* --------------- MAIN CONTAINER ---------------------- */}

<Box className="flex flex-col md:flex-row">

{/* ------------- PROFILE PHOTO SECTION ----------------- */}

<Box className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 h-fit pb-6 md:pb-0 md:h-screen  w-screen md:w-[35vw] flex flex-col items-start md:items-center gap-3 md:gap-6 md:sticky top-0 z-10 static">

{loading ? (
  <Box className="mt-12 md:mt-24 ml-10 md:ml-0">
  <CircularProgress className="text-white"/>
  </Box>
) : (
  <>
  <Avatar 
  src={`${ConsultData.consultProfilePhoto1}`}
  className='h-28 w-28 sm:h-32 sm:w-32 md:h-[20vh] md:w-[20vw] lg:h-44 lg:w-44 mt-6 ml-8 md:ml-0'/>
  </>
)}
  
  <Typography className='text-2xl text-gray-200 sm:text-3xl md:text-4xl font-extrabold tracking-wide ml-8 md:ml-0'>
    {ConsultData.name}
  </Typography>

  <Typography className='text-lg text-gray-300 md:text-sm font-semibold mx-8 text-justify'>
    {ConsultData.consultAbout}
  </Typography>
  
</Box>

{/* -------------- BOOKING SECTION ----------------------- */}

<Box className="flex flex-col items-center w-screen md:w-[65vw] bg-[#efece3]">

{/* ------------------ BUTTON SECTION -------------------- */}

<Box className="flex h-fit gap-4 mt-4 md:mt-6">
<Button
onClick={() => setCategory("All")}
variant='outlined'
className={`border-black ${Category === "All" ? "bg-black text-white" : "text-black bg-white"}
 text-black py-1 sm:py-2 md:py-3 normal-case text-md md:text-xl rounded-xl`}>
  All
</Button>
<Button
onClick={() => setCategory("1:1")}
variant='outlined'
className={`border-black ${Category === "1:1" ? "bg-black text-white" : "text-black bg-white"}
 text-black py-1 sm:py-2 md:py-3 normal-case text-md md:text-xl rounded-xl`}>
  1:1 Call
</Button>
<Button
onClick={() => setCategory("Priority")}
variant='outlined'
className={`border-black ${Category === "Priority" ? "bg-black text-white" :
"text-black bg-white"} text-black py-1 sm:py-2 md:py-3 normal-case text-md md:text-xl rounded-xl`}>
  Priority DM
</Button>
</Box>

{/* ------------------- CATEGORY CARDS SECTION --------------------- */}

{load ? (
  <Box className="my-44">
  <CircularProgress size={30} className="text-black"/>
  </Box>
) : (
  <Box className="flex gap-3 flex-wrap justify-center mt-8">

{(Category === "All" || Category === "1:1") && package1?.des && (
   <div>
     <CategoryCard data={package1} />
   </div>
)}


{(Category === "All" || Category === "1:1") && package2?.des && (
   <div>
     <CategoryCard data={package2} />
   </div>
)}


{(Category === "All" || Category === "1:1") && package3?.des && (
   <div>
     <CategoryCard data={package3} />
   </div>
)}


{(Category === "All" || Category === "1:1") && package4?.des && (
   <div>
     <CategoryCard data={package4} />
   </div>
)}


{ (Category === "All" || Category === "Priority") && priorityDM?.des && (
    <div>
      <CategoryCard data={priorityDM} />
    </div>
)}

</Box>
)}

{/* ------------------ SIMILAR PROFILE SECTION -------------------- */}

{isSimilar && (
  <Box className="mt-4 md:mt-8 bg-[#ebe9d7] p-10 rounded-[30px]">

  <Box className="flex gap-52">
  <Typography className="text-[#0a0a0a] text-3xl font-medium">
    Similar Profiles
  </Typography>
  <Button
  onClick={() => setIsSimilar(false)}
  variant='contained'
  className="bg-[#e5d9c3] hover:bg-[#d3c9b6] text-gray-800 font-semibold rounded-[15px] normal-case shadow-none hover:shadow-none transition-all"
  >
    Dismiss
  </Button>
  </Box>

  <Box className="mt-8 flex gap-4">
    {ConsultAllData.map((data,idx) => (
      <NavLink to={`/Profile/${data._id}?name=${data.name}`} 
      onClick={(e) => {
        setTimeout(() => {
          window.location.reload();
        }, 100); 
      }}>
      <div key={idx}>
      <SimilarProfileCard data={data}/>
      </div>
      </NavLink>  
    ))}
  </Box>

</Box>
)}

{/* -------------------- ABOUT SECTION ---------------------------- */}

<Box className="flex flex-col w-full ml-12 mb-8 mt-6 md:mt-10">

  <Typography className="text-[#3a3a39] text-4xl">
    About Me
  </Typography>
  
  <a href={ConsultData.consultLinkedin} target="_blank" rel="noopener noreferrer">
  <Box className="bg-[#fefefe] w-fit p-4 rounded-2xl cursor-pointer mt-2 md:mt-4">
    <span><FaLinkedin className='text-4xl'/></span>
  </Box>
  </a>

  <Typography className='mt-2 md:mt-4 text-[#3a3a39] text-lg pr-8 text-justify mr-4'>
    {ConsultData.consultDescription}
  </Typography>

</Box>

</Box>
</Box>
</>
  )
}

export default ConsultProfile

// --------------- CATEGORY CARD ----------------
// --------------- CATEGORY CARD ----------------
// --------------- CATEGORY CARD ----------------
// --------------- CATEGORY CARD ----------------
// --------------- CATEGORY CARD ----------------

export const CategoryCard = ({data}) => {

  const navigate = useNavigate()

// ------------- HANDLING TO PARTICULAR PACKAGE ROUTE -----------

  const handleRoute = (id,name, packages) => {
    navigate(`/${packages}/${id}`)
  }

  return (
<>
<Box className="flex flex-col items-start py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 bg-white rounded-[20px] w-[90vw] md:w-[40vw] lg:w-[30vw] h-fit">

  <Typography className='text-[#3c3c3c] text-lg md:text-xl font-bold tracking-wide'>
    {data.name}
  </Typography>

  <Typography className='text-[#8b8b8b] mt-3 md:mt-4 line-clamp-2'>
    {data.des}
  </Typography>

  <Box className="flex bg-[#efeff0] items-center mt-4 md:mt-6 py-3 sm:py-4 md:gap-10 justify-between px-4 rounded-3xl w-full">
    <Box className="flex gap-2">
    <FaCalendarAlt className='text-3xl mt-1 text-gray-400'/>

    <Box className="flex flex-col">
      <Typography className="font-semibold text-[#3a3a3b]">
        {data.mins} mins
      </Typography>
      <Typography className="text-gray-500 text-sm">
        {data.contactType}
      </Typography>
    </Box>
    </Box>

    <Button
    variant='outlined'
    className='rounded-[20px] text-black text-lg border-black hover:bg-black hover:text-white transition-all'
    onClick={() => handleRoute(data.id,data.name, data.package)}
    >
      ${data.price} <span className='ml-2'><FaArrowRight/></span>
    </Button>
  </Box>

</Box>
</>
  )
}

// --------------- SIMILAR PROFILE CARD ----------------
// --------------- SIMILAR PROFILE CARD ----------------
// --------------- SIMILAR PROFILE CARD ----------------
// --------------- SIMILAR PROFILE CARD ----------------
// --------------- SIMILAR PROFILE CARD ----------------

export const SimilarProfileCard = ({data}) => {

  return (
<>
<Box className="bg-white rounded-[15px] w-[180px] p-4 cursor-pointer">

  <img 
  src={`${data.consultProfilePhoto1}`}
  alt="Image"
  className='w-36 h-36 rounded-[15px]'/>

  <Typography className="text-lg font-semibold text-[#484848] mt-2">
    {data.name}
  </Typography>

  <Typography className='line-clamp-2 text-sm text-[#9e9e9e] mt-2'>
    {data.consultAbout}
  </Typography>

</Box>
</>
  )
}