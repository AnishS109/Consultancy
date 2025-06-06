import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ConsultDashHomeContent } from "./ConsultPages/C_DashHome"
import { ConsultDashProfileContent } from "./ConsultPages/C_DashProfile"
import { C_package_content } from "./ConsultPages/C_Package";
import { ConsultAvailabilityContent } from "./ConsultPages/C_Availability";

import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { FaRegClock } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

const ConsultHome = () => {

  const navigate = useNavigate()
  const loaction = useLocation()

  const activePage = loaction.pathname.split("/").pop()
  
  const renderComponents = () => {
    switch (activePage) {
      case "home":
        return <ConsultDashHomeContent />;
      case "profile":
        return <ConsultDashProfileContent />;
      case "availability":
        return <ConsultAvailabilityContent/>
      case "package":
        return <C_package_content/>
    }
  };

  return (
    <>
<Box className="flex">

<Box className="h-screen sticky top-0 left-0  w-[387px] hidden md:block bg-[#f7f6f2]">

{/* --------------------------------------------------------------------------------------------- */}

<Box className="flex flex-col items-center gap-4">

<Typography className="bg-[#ece6db] w-fit p-3 px-10 text-nowrap rounded-[10px] text-[14px] text-stone-700  font-semibold mt-5"> 
<span><DashboardIcon className="text-[18px] mb-[2px] text-[#8c5300]"/></span> Consultant Dashboard
</Typography>

<Typography className="text-3xl font-bold tracking-tight">
Grookit
</Typography>

<Box className="h-2 border-b-2 w-[80%]"></Box>

</Box>

{/* ---------------------------------------------------------------------------------- */}

<Box className="flex flex-col items-center mt-8 gap-3">

<Button
onClick={() => navigate("/consultant/dashboard/home")}
variant="outlined"
className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "home" ? "bg-[#ece6db]":""}`}>
<span><HomeIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Home</span>
</Button>

<Button
onClick={() => navigate("/consultant/dashboard/profile")}
variant="outlined"
className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "profile" ? "bg-[#ece6db]":""}`}>
<span><AccountBoxIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Profile</span>
</Button>

<Button
onClick={() => navigate("/consultant/dashboard/availability")}
variant="outlined"
className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "availability" ? "bg-[#ece6db]":""}`}>
<span><FaRegClock className="text-black text-xl"/></span><span className="text-[17px] font-semibold mt-[5px]">Availability</span>
</Button>

<Button
onClick={() => navigate("/consultant/dashboard/package")}
variant="outlined"
className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "package" ? "bg-[#ece6db]":""}`}>
<span><FiPackage className="text-black text-2xl"/></span><span className="text-[17px] font-semibold mt-[5px]">Package</span>
</Button>

</Box>
</Box>

{/* ----------------------------------------------------------------------------------- */}

<Box className="w-[100%]">
{renderComponents()}
</Box>

{/* --------------------------------------------------------------------------------------- */}

</Box>
    </>
  )
}

export default ConsultHome;