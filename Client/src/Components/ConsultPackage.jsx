import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  { DataContext } from "../Context/DataProvider"
import Navbar from "../Layout/NavBar"
import { Alert, Avatar, Box, Button, CircularProgress, Snackbar, TextField, Typography } from "@mui/material"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Navigation } from "swiper/modules";

import { FaRegClock } from "react-icons/fa";

const ConsultPackage = () => {

// --------- FETCHING PARAMS FROM URL -------------

  const {id, Package} = useParams()

// --------- FROM CONTEXT API -------------

  const { backendUrl } = useContext(DataContext)

// ------------- USE STATES ------------

  const [packageData, setPackageData] = useState({
    title:"",
    price:"",
    description:"",
    time:"",
    email:"",
    name:"",
    profile:""
  })
  const [timeData, setTimeData] = useState({
    Monday:[],
    Tuesday:[],
    Wednesday:[],
    Thursday:[],
    Friday:[],
    Saturday:[],
    Sunday:[],
  })
  const [messageModal, setMessageModal] = useState({ open: false, message: '', severity: '' });
  const [load, setLoad] = useState(false)
  const [loads, setLoads] = useState(false)
  const [loadss, setLoadss] = useState(false) 
  const [times, setTime] = useState("") 
  const [date, setDate] = useState("") 

// --------------- DATE USE STATES ---------------

  const todayz = new Date();
  const formattedToday = `${todayz.getDate()} ${todayz.toLocaleString("en", { month: "short" })}`;
  const todayWeekDay = todayz.toLocaleDateString("en", { weekday: "long" });
  const [activeDate, setActiveDate] = useState(formattedToday);
  const [timeSlots, setTimeSlots] = useState(timeData[todayWeekDay] || []);

// --------- FETCHING PACKAGE DETAILS -------------

useEffect(() => {
  const fetch = async() => {
    setLoad(true)
    const pack = Package
    try {
      const response = await axios.get(`${backendUrl}/Consult/Fetching-Package-Details-By-ID`, {
        params:{id}
      })
      if(response.status === 200){
        setPackageData({...packageData, 
          title:response.data[`${Package}Title`],
          price:(response.data[`${Package}Price`]),
          description:(response.data[`${Package}Description`]),
          time:(response.data[`${Package}Time`]),
          email:(response.data.email),
          name:(response.data.name)
        });
      } 
    } catch (error) {
      setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
    } finally {
      setLoad(false)
    }
  }
  fetch()
},[])

// ---------- FETCHING PROFILE PHOTO -----------

useEffect(() => {
  if (packageData.email) {  
    const fetchProfilePhoto = async () => {
      setLoads(true)
      try {
        const response = await axios.get(`${backendUrl}/Consult/Fetching-Profile-Photo`, {
          params: { email: packageData.email }
        });
        if (response.status === 200) {
          setPackageData((prevData) => ({
            ...prevData,
            profile: response.data
          }));
        }
      } catch (error) {
        setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
      } finally {
        setLoads(false)
      }
    };

    fetchProfilePhoto();
  }
}, [packageData.email]);  

// -------------- FETCHING AVAILABILITY DATES -------------

useEffect(() => {
  if (packageData.email) {  
    const fetchAvailability = async () => {
      setLoadss(true)
      try {
        const response = await axios.get(`${backendUrl}/Consult/Fetching-Availability`, {
          params: { email: packageData.email }
        });
        if (response.status === 200) {
          setTimeData({
            ...timeData,
            ...response.data
          });
          
        }
      } catch (error) {
        setMessageModal({ open: true, message: error.response?.data?.message || "Check your connection! Try later", severity: 'error' })
      } finally {
        setLoadss(false)
      }
    };

    fetchAvailability();
  }
}, [packageData.email]);

// ------------------ DATE LOGIC ------------------

const today = new Date();
const dates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  return {
    formattedDate: `${date.getDate()} ${date.toLocaleString("en", { month: "short" })}`, // "18 Mar"
    fullDate: date, // For console log
  };
});

const handleDateClick = (dateObj) => {
  const weekDay = dateObj.fullDate.toLocaleDateString("en", { weekday: "long" });
  setActiveDate(dateObj.formattedDate);

  if (timeData[weekDay]) {
    setTimeSlots(timeData[weekDay]);
  } else {
    setTimeSlots([]);
  }
};


  return (
<>

<Navbar/>

{/* ------------------ BACKGROUND ------------------ */}

<Box className="h-fit min-h-screen w-[100vw] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-950 p-4 md:p-8 flex gap-10">

{load ? (
  <Box className="h-screen w-screen flex justify-center items-center">
  <CircularProgress className="text-white"/>
  </Box>
) : (
  <>
{/* -------------------- LEFT CONTAINER --------------- */}

<Box className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-100 h-fit w-full md:w-[50vw] rounded-[50px] p-8">

{/* ------------------- PACKAGE NAME ------------------ */}

<Typography className="text-lg md:text-xl font-semibold">
  {packageData.name}
</Typography>

{/* -------- PACKAGE TITLE and PROFILE PHOTO ------ */}

<Box className='mt-6 flex justify-between items-center pb-4 md:pb-6 border-b-2 border-gray-500'>

<Typography className="text-xl md:text-2xl text-[#3a393c] font-extrabold">
  {packageData.title}
</Typography>

{loads ? (
<Box className="h-24 md:h-28 w-24 md:w-28">
  <CircularProgress size={30} className="text-black mt-8 md:mt-10" />
</Box>
) : (
<Avatar 
src={packageData.profile}
className="h-24 md:h-28 w-24 md:w-28"/>
)}

</Box>

{/* --------------- PRICE and TIMIING ------------- */}

<Box className="flex justify-between items-center py-4 border-b-2 border-gray-500">

<Button
variant="outlined"
className="text-black border-black font-bold text-lg md:p-2 cursor-not-allowed rounded-3xl w-28"
>
  $ {packageData.price}+
</Button>

<Typography className="text-lg md:text-xl">
<span><FaRegClock className="text-2xl inline mb-1"/></span> {packageData.time} mins
</Typography>

</Box>

{/* ---------------- DESCRIPTION -------------- */}

<Typography className="mt-4">
  {packageData.description}
</Typography>

{/* ------------------- FOR MOBILE VIEW -------------------- */}

<Box className="md:hidden h-fit w-full md:w-[50vw] items-center flex-col border-t-2 border-gray-500 mt-8">

  <Typography className="text-xl text-center font-bold mb-4 mt-4">
    When Should We Meet?
  </Typography>

  {/* Navigation Arrows */}
  <Box className="flex items-center w-full gap-2 mt-8">
  <button className="prev-btn text-2xl cursor-pointer">
    <AiOutlineLeft />
  </button>

  {/* Slider Section */}
  <Swiper
    slidesPerView="auto"
    spaceBetween={10}
    freeMode={true}
    navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
    modules={[Navigation]}
    className="w-full"
  >
    {dates.map((dateObj, index) => (
      <SwiperSlide key={index} className="max-w-[60px]">
        <Box
          className={`border-2 p-3 rounded-xl text-center cursor-pointer
          ${activeDate === dateObj.formattedDate 
            ? "border-black font-bold" 
            : "border-gray-400"}
          hover:border-gray-600`}
          onClick={() => {
            handleDateClick(dateObj); 
            setDate(dateObj.formattedDate); 
          }}
        >
          <Typography>{dateObj.formattedDate}</Typography>
        </Box>
      </SwiperSlide>
    ))}
  </Swiper>

  <button className="next-btn text-2xl cursor-pointer">
    <AiOutlineRight />
  </button>
</Box>


{/* ---------------- AVAILABILITY DATES ---------------- */}

{timeSlots && timeSlots.length > 0 ? (
  <Box className="mt-12 flex flex-wrap gap-4">
    {timeSlots.map((data, idx) => {
      const [startTime] = data.split(" - "); // Only take the startTime

      const formatTime = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        const formattedHour = ((hour % 12) || 12).toString().padStart(2, '0');
        const period = hour >= 12 ? 'PM' : 'AM';
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
      };

      return (
        <Box 
          key={idx} 
          className={`p-2 border-black border-2 font-bold rounded-md hover:text-white hover:bg-black transition-all cursor-pointer ${times == (formatTime(startTime)) ? "bg-black text-white" : "text-black "}`}
          onClick={() => setTime(formatTime(startTime))}
        >
          {formatTime(startTime)}
        </Box>
      );
    })}
  </Box>
) : (
  <Box className="h-40" />
)}


{/* ----------------- CONFIRM BUTTON ------------------ */}

<Button 
variant="outlined"
disabled={!times || !date}
onClick={() => console.log(times,date)}
className="border-black normal-case text-black rounded-3xl w-full text-lg py-3 mt-8">
  Confirm Details
</Button>

</Box>

</Box>

{/* ------------------- RIGHT CONTAINER --------------- */}

<Box className="md:flex hidden bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 h-fit w-full md:w-[40vw] rounded-[50px] p-8 md:items-center md:flex-col">

  <Typography className="text-2xl font-bold mb-4">
    When Should We Meet?
  </Typography>

  {/* Navigation Arrows */}
  <Box className="flex items-center w-full gap-2 mt-8">
  <button className="prev-btn text-2xl cursor-pointer">
    <AiOutlineLeft />
  </button>

  {/* Slider Section */}
  <Swiper
    slidesPerView="auto"
    spaceBetween={10}
    freeMode={true}
    navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
    modules={[Navigation]}
    className="w-full"
  >
    {dates.map((dateObj, index) => (
      <SwiperSlide key={index} className="max-w-[60px]">
        <Box
          className={`border-2 p-3 rounded-xl text-center cursor-pointer
          ${activeDate === dateObj.formattedDate 
            ? "border-black font-bold" 
            : "border-gray-400"}
          hover:border-gray-600`}
          onClick={() => {
            handleDateClick(dateObj); 
            setDate(dateObj.formattedDate); 
          }}
        >
          <Typography>{dateObj.formattedDate}</Typography>
        </Box>
      </SwiperSlide>
    ))}
  </Swiper>

  <button className="next-btn text-2xl cursor-pointer">
    <AiOutlineRight />
  </button>
</Box>


{/* ---------------- AVAILABILITY DATES ---------------- */}

{timeSlots && timeSlots.length > 0 ? (
  <Box className="mt-12 flex flex-wrap gap-4">
    {timeSlots.map((data, idx) => {
      const [startTime] = data.split(" - "); // Only take the startTime

      const formatTime = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        const formattedHour = ((hour % 12) || 12).toString().padStart(2, '0');
        const period = hour >= 12 ? 'PM' : 'AM';
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
      };

      return (
        <Box 
          key={idx} 
          className={`p-2 border-black border-2 font-bold rounded-md hover:text-white hover:bg-black transition-all cursor-pointer ${times == (formatTime(startTime)) ? "bg-black text-white" : "text-black "}`}
          onClick={() => setTime(formatTime(startTime))}
        >
          {formatTime(startTime)}
        </Box>
      );
    })}
  </Box>
) : (
  <Box className="h-40" />
)}


{/* ----------------- CONFIRM BUTTON ------------------ */}

<Button 
variant="outlined"
disabled={!times || !date}
onClick={() => console.log(times,date)}
className="border-black normal-case text-black rounded-3xl w-full text-lg py-3 mt-8">
  Confirm Details
</Button>

</Box>
</>
)}

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

export default ConsultPackage
