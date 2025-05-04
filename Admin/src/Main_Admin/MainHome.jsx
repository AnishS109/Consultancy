import React, { useContext } from 'react'
import { AdminsAllContent } from './pages/AdminsAll'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockIcon from '@mui/icons-material/Lock';

import { DataContext } from '../Context/DataProvider';
import { ConsultantCOntent } from './pages/Consultant';
import { AddAdminContent } from './pages/AddAdmin';
import { ChangePassContent } from './Components/ChangePass';

const MainHome = () => {

  const {account} = useContext(DataContext)

  const navigate = useNavigate()
  const loaction = useLocation()

  const activePage = loaction.pathname.split("/").pop()
  
  const RenderComponent = () => {
    if (activePage === "Admin" && account.type === true) {
      return <AdminsAllContent />;
    }
    else if (activePage === "Consultants") {
      return <ConsultantCOntent />;
    }
    else if (activePage === "Add-Admin" && account.type === true) {
      return <AddAdminContent/>
    }
    else if (activePage === "Change-Password") {
      return <ChangePassContent/>
    }
  };

  return (
    <>
<Box className="flex">
  

<Box className="h-screen sticky top-0 left-0  w-[387px] hidden md:block bg-[#f7f6f2]">

{/* --------------------------------------------------------------------------------------------- */}

<Box className="flex flex-col items-center gap-4">

<Typography className="bg-[#ece6db] w-fit p-3 px-10 text-nowrap rounded-[10px] text-[14px] text-stone-700  font-semibold mt-5"> 
<span><DashboardIcon className="text-[18px] mb-[2px] text-[#8c5300]"/></span> Admin Dashboard
</Typography>

<Typography className="text-3xl font-bold tracking-tight">
Grookit
</Typography>

<Box className="h-2 border-b-2 w-[80%]"></Box>

</Box>

{/* ---------------------------------------------------------------------------------- */}

<Box className="flex flex-col items-center mt-8 gap-3">

<Button
onClick={() => navigate("/Admin")}
variant="outlined"
className={`${account.type === true ? "" : "hidden" } normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "Admin" ? "bg-[#ece6db]":""}`}>
<span><PersonIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Sub-Admins</span>
</Button>

<Button
onClick={() => navigate("/Consultants")}
variant="outlined"
className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "Consultants" ? "bg-[#ece6db]":""}`}>
<span><SchoolIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Consultants</span>
</Button>

<Button
onClick={() => navigate("/Add-Admin")}
variant="outlined"
className={`${account.type === true ? "" : "hidden" } normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "Add-Admin" ? "bg-[#ece6db]":""}`}>
<span><AddCircleIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Admin</span>
</Button>

<Button
onClick={() => navigate("/Change-Password")}
variant="outlined"
className={`normal-case w-[80%] text-stone-700 hover:bg-[#ece6db] border-none flex justify-start gap-4 ${activePage === "Change-Password" ? "bg-[#ece6db]":""}`}>
<span><LockIcon className="text-black"/></span><span className="text-[17px] font-semibold mt-[5px]">Change Password</span>
</Button>

</Box>
</Box>

{/* ----------------------------------------------------------------------------------- */}

<Box className="w-[100%]">
{RenderComponent()}
</Box>

{/* --------------------------------------------------------------------------------------- */}

</Box>
    </>
  )
}

export default MainHome
