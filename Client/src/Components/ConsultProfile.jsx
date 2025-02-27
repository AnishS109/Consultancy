import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import Navbar from '../Layout/NavBar'
import { DataContext } from "../Context/DataProvider"

import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

import Image from "../assets/images.jpg"

const ConsultProfile = () => {
  
  const {backendUrl} = useContext(DataContext)
  const { id } = useParams()

// ------------------ USE STATES --------------------

  const [isSimilar, setIsSimilar] = useState(true)
  const [Category, setCategory] = useState("All")
  const [ConsultData, setConsultData] = useState({})
  const [loading, setLoading] = useState(false)
  const [ConsultAllData, setConsultAllData] = useState([])


  const staticCardInfo = [
    {
      name:"Resume type",
      des:"On call resume review",
      mins:"45 mins",
      contactType:"Video Meeting",
      price:"500",
      type:"1:1"
    },
    {
      name:"Quick Chat About Anything!",
      des:"Anyone can become a PM, just to be a good problem solver :)",
      mins:"30 mins",
      contactType:"Video Meeting",
      price:"250",
      type:"Priority"
    }
  ]

  const SimilarProfileInfo = [
    {
      img: Image,
      name:"Anish Saini",
      des: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, sit."
    },
    {
      img: Image,
      name:"Kunnu Saini",
      des: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, sit."
    }
  ]

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
        }
      } catch (error) {
        console.log(error.response.data.message);
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
  },[id,backendUrl])

  return (
<>
  <Navbar/>

{/* --------------- MAIN CONTAINER ---------------------- */}

<Box className="flex flex-col md:flex-row">

{/* ------------- PROFILE PHOTO SECTION ----------------- */}

<Box className="bg-[#d5534d] h-fit pb-6 md:pb-0 md:h-screen  w-screen md:w-[35vw] flex flex-col items-start md:items-center gap-3 md:gap-6 md:sticky top-0 z-10 static">

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
  
  <Typography className='text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide ml-8 md:ml-0'>
    {ConsultData.name}
  </Typography>

  <Typography className='text-lg md:text-xl font-semibold mx-8 text-justify'>
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

<Box className="flex gap-3 flex-wrap justify-center mt-8">
  {staticCardInfo
  .filter((data) => Category === "All" || data.type === Category)
  .map((data, idx) => (
    <div key={idx}>
      <CategoryCard data={data}/>
    </div>
  ))}
</Box>

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
      <NavLink to={`/Profile/${data._id}?name=${data.name}`}>
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

  return (
<>
<Box className="flex flex-col items-start py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 bg-white rounded-[20px] w-[90vw] md:w-[40vw] lg:w-[30vw] h-fit">

  <Typography className='text-[#3c3c3c] text-lg md:text-xl font-bold tracking-wide'>
    {data.name}
  </Typography>

  <Typography className='text-[#8b8b8b] mt-3 md:mt-4'>
    {data.des}
  </Typography>

  <Box className="flex bg-[#efeff0] items-center mt-4 md:mt-6 py-3 sm:py-4 md:gap-10 justify-between px-4 rounded-3xl w-full">
    <Box className="flex gap-2">
    <FaCalendarAlt className='text-3xl mt-1 text-gray-400'/>

    <Box className="flex flex-col">
      <Typography className="font-semibold text-[#3a3a3b]">
        {data.mins}
      </Typography>
      <Typography className="text-gray-500 text-sm">
        {data.contactType}
      </Typography>
    </Box>
    </Box>

    <Button
    variant='outlined'
    className='rounded-[20px] text-black text-lg border-black hover:bg-black hover:text-white transition-all'
    >
      ₹{data.price} <span className='ml-2'><FaArrowRight/></span>
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