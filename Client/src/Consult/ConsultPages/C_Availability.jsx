import React, { useContext, useEffect, useState } from 'react'
import ConsultHome from '../ConsultHome'
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Snackbar, TextField } from '@mui/material'
import { DataContext } from '../../Context/DataProvider'
import axios from 'axios';

import { MdDelete } from "react-icons/md";

export const ConsultAvailabilityContent = () => {

  const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const { account, backendUrl } = useContext(DataContext);

  // ------------------ USE STATES ------------------

  const [day, setDay] = useState("Monday");
  const [timeData, setTimeData] = useState({
    startTime: "",
    endTime: "",
    email: account.email,
    dayType: day,
    timeRange: "",
  });
  const [modalMsg,setModalMsg] = useState({
    open:false,
    msg:"",
    severity:""
  })
  const [modal, setModal] = useState({
    open:false,
    times:"",
    days:"",
    showTime:""
  })
  const [load,setLoad] = useState(false)
  const [addLoad,SetAddLoad] = useState(false)
  const [delLoad,setDelLoad] = useState(false)
  const [backendTime,setBackendTime] = useState({})

  // --------- HANDLING DAY TYPE ON CHANGE ----------------

  useEffect(() => {
    setTimeData({...timeData, dayType:day})
  },[day])

  // --------------- HANDLE SUBMIT ------------------

  const handleSubmit = async () => {
    SetAddLoad(true)
    if(timeData.startTime == timeData.endTime){
      SetAddLoad(false)
      setModalMsg({open:true, msg:"Start and End Time Cannot be equal", severity:"error"})
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/Consult/Adding-Availability`, timeData)
      if(response.status === 200){
        setModalMsg({open:true, msg:response.data.message, severity:"success"});
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    } finally {
      SetAddLoad(false)
    }
  };

  // --------------- HANDLE DELETE TIME ------------

  const handleDeleteTime = async(time, dayType) => {
    setDelLoad(true)
    const serverData = {time, dayType, email:account.email, role:account.role}
  
    try {
      const response = await axios.delete(`${backendUrl}/Consult/Delete-Availability-Timing`, {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        },
        data: serverData, 
      });
      if(response.status === 200){
        setModalMsg({open:true, msg:response?.data?.message || "Check Your Conntection! Try Later.", severity:"success"});
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
    } finally {
      setDelLoad(false)
      setModal({days:"", times:"", open:false, showTime:""})
    }
  }

  // -------------- FETCHING DATA -------------------

  useEffect(() => {
    const fetchTimeData = async() => {
      setLoad(true)
      try {
        const response = await axios.get(`${backendUrl}/Consult/Fetching-Availability-Timing`, {
          params:{email:account.email, role:account.role},
          headers:{
            Authorization:`Bearer ${account.accessToken}`
          }
        })
        if(response.status === 200){
          setBackendTime(response.data.Availability)
        }
      } catch (error) {
        setModalMsg({open:true, msg:error.response?.data?.message || "Check Your Conntection! Try Later.", severity:"error"});
      } finally {
        setLoad(false)
      }
    }
    fetchTimeData()
  },[addLoad, day, delLoad])

  const filteredTimes = backendTime?.[day] ?? [];

  return (
<>
{/* -------------------- HEADER  ------------------- */}

<Box className="border-b-2 h-fit md:h-36 flex py-4 flex-wrap gap-2 items-center justify-center">
{weekDay.map((days, idx) => (
<Button
variant="outlined"
className={`rounded-lg font-bold ${day === days ? "text-white bg-black" : "text-black border-black"}`}
onClick={() => setDay(days)}
key={idx}
>
{days}
</Button>
))}
</Box>

{/* ----------------- ADD TIMING ------------------ */}

<Box className="border-b-2 pb-6 flex items-center justify-center gap-4 mx-1">

<Box className="w-[130px] sm:w-[150px] md:w-[15vw]">
  <TextField
    type="time"
    fullWidth
    inputProps={{ step: 900 }} // 900 seconds = 15 minutes
    onChange={(e) => {
      const newStartTime = e.target.value;
      setTimeData((prev) => ({
        ...prev,
        startTime: newStartTime,
        timeRange: `${newStartTime} - ${prev.endTime || newStartTime}`,
      }));
    }}
    variant="outlined"
    name="startTime"
    className="mt-5 bg-gray-50 rounded-lg"
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

<span className="text-lg font-bold">to</span>

<Box className="w-[130px] sm:w-[150px] md:w-[15vw]">
  <TextField
    type="time"
    fullWidth
    inputProps={{ step: 900 }} // 900 seconds = 15 minutes
    onChange={(e) => {
      const newEndTime = e.target.value;
      setTimeData((prev) => ({
        ...prev,
        endTime: newEndTime,
        timeRange: `${prev.startTime || newEndTime} - ${newEndTime}`,
      }));
    }}
    variant="outlined"
    name="endTime"
    className="mt-5 bg-gray-50 rounded-lg"
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

<Button
onClick={handleSubmit}
variant="outlined"
className="w-28 text-nowrap sm:w-40 mt-4 bg-gradient-to-r from-gray-800 via-gray-700 font-bold to-gray-950 text-white"
>
Add Time
</Button>

</Box>

{/* ------------ SHOWING TIMINGS -------------- */}

<Box className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-2">
{load ? (
    <CircularProgress className='text-black'/>
  ) : filteredTimes.length > 0 ? (
    filteredTimes.map((time, index) => {
      // Split the time range into start and end times
      const [startTime, endTime] = time.split(" - ");

      // Function to format time
      const formatTime = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
      };

      return (
        <Box
          key={index}
          className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-md border border-gray-300 w-[90vw] sm:w-[60vw] md:w-[50vw] transition-all duration-300 ease-in-out"
        >
          {/* Display formatted start and end times */}
          <span className="text-lg font-semibold text-gray-800">
            {formatTime(startTime)} - {formatTime(endTime)}
          </span>

          <Button 
            variant='outlined'
            className="text-red-600 border-red-500 transition-all duration-200"
            onClick={() => setModal({ open: true, showTime: time, times: time, days: day })} 
          >
            <MdDelete size={24} />
          </Button>
        </Box>
      );
    })
  ) : (
    <p className="text-gray-500 text-center text-xl mt-10">
      No availability added for {day}
    </p>
  )}
</Box>

{/* -------------------- SANCK BAR --------------------- */}

<Snackbar
  open={modalMsg.open}
  className="mt-4"
  autoHideDuration={3000}
  onClose={() => setModalMsg({ ...modalMsg, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    severity={modalMsg.severity}
    sx={{ width: "100%" }}
  >
    <b>{modalMsg.msg}</b>
  </Alert>
</Snackbar>

{/* ---------------- CONFIRM DELETE MODAL --------------- */}

<Dialog open={modal.open} onClose={() => setModal({days:"",times:"", open:false, showTime:""})}>

<DialogTitle className="mt-2">
  <p>
Are you sure you want to delete <span className='font-bold'>{modal.showTime}</span> from <span className='font-bold'>{modal.days}</span>?
  </p>
</DialogTitle>

<DialogActions>
<Button onClick={() => setModal({days:"",times:"", open:false, showTime:""})}>Cancel</Button>
{delLoad ? (
  <CircularProgress size={20} className='mr-8 text-black'/>
) : (
<Button
onClick={() => handleDeleteTime(modal.times, modal.days)}
className="text-red-500"
>
Confirm
</Button>
)}
</DialogActions>
</Dialog>

</>
);
};

const C_Availability = () => {
  return (
    <div>
      <ConsultHome/>
    </div>
  )
}

export default C_Availability
