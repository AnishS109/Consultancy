import React, { useState } from 'react'
import ConsultHome from '../ConsultHome'
import { Box, Button, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

// ------------------------------------------------------------------------------------------------------

export const ConsultDashProfileContent = () => {

  const location = useLocation()

  const navigate = useNavigate()

  const [activeButton, setActiveButton] = useState("Profile")

  return (
<>
{/* ---------------------------------------- HEADER ------------------------------------------------- */}

<Box className="h-fit border-b-2 w-[100%] flex flex-col">

  <Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10'>
    Profile
  </Typography>
  
  <Box className="flex pb-2 px-10 gap-4 sm:gap-6">
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

</Box>  

{/* -------------------------------------- REMAINING ------------------------------------------------ */}
  
  {activeButton === "Profile" ? (
    <p>Profile Details</p> 
  ): (
    <p>Account Details</p>
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