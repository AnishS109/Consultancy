import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DashHomeContent } from "./DashBoardPages/DashHome";
import { DashBookingsContent } from "./DashBoardPages/DashBookings";
import { DashFindContent } from "./DashBoardPages/DashFind";
import { DashProfileContent } from "./DashBoardPages/DashProfile";
import { DashRewardsContent } from "./DashBoardPages/DashRewards";

import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const StudentHome = () => {

  const navigate = useNavigate()
  const loaction = useLocation()

  const activePage = loaction.pathname.split("/").pop()
  
  const renderComponents = () => {
    switch (activePage) {
      case "home":
        return <DashHomeContent />;
      case "bookings":
        return <DashBookingsContent />;
      case "find":
        return <DashFindContent />;
      case "profile":
        return <DashProfileContent />;
      case "rewards":
        return <DashRewardsContent />;
    }
  };
  

  return (
    <> 
    <Box className="flex">

      <Box className="h-screen sticky top-0 left-0 w-[387px] hidden md:block bg-[#f7f6f2]">

{/* --------------------------------------------------------------------------------------------- */}

  <Box className="flex flex-col items-center gap-4">

    <Typography className="bg-[#ece6db] w-fit p-3 px-10 rounded-[10px] text-[14px] text-stone-700  font-semibold mt-5"> 
      <span><DashboardIcon className="text-[18px] mb-[2px] text-[#8c5300]"/></span> Student Dashboard
    </Typography>

    <Typography className="text-3xl font-bold tracking-tight">
      Grookit
    </Typography>

    <Box className="h-2 border-b-2 w-[80%]"></Box>
  
  </Box>

{/* --------------------------------------------------------------------------------------------- */}

<Box className="flex flex-col items-center mt-8 gap-3">

  <Button
  onClick={() => navigate("/student/dashboard/home")}
  variant="outlined"
  className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "home" ? "bg-[#ece6db]":""}`}>
  <span><HomeIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Home</span>
  </Button>

  <Button 
  onClick={() => navigate("/student/dashboard/bookings")}
  variant="outlined"
  className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "bookings" ? "bg-[#ece6db]":""}`}>
  <span><PhoneInTalkIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Bookings</span>
  </Button>

  <Button 
  onClick={() => navigate("/student/dashboard/find")}
  variant="outlined"
  className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "find" ? "bg-[#ece6db]":""}`}>
  <span><SearchIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Find Consultant</span>
  </Button>

  <Button 
  onClick={() => navigate("/student/dashboard/profile")}
  variant="outlined"
  className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "profile" ? "bg-[#ece6db]":""}`}>
  <span><AccountBoxIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Profile</span>
  </Button>

  <Button 
  onClick={() => navigate("/student/dashboard/rewards")}
  variant="outlined"
  className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "rewards" ? "bg-[#ece6db]":""}`}>
  <span><CardGiftcardIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Rewards</span>
  </Button>

</Box>
</Box>

{/* --------------------------------------------------------------------------------------------- */}
<Box className="w-[100%]">
  {renderComponents()}
  </Box>

{/* --------------------------------------------------------------------------------------------- */}

  </Box>
    </>
  )
}

export default StudentHome;