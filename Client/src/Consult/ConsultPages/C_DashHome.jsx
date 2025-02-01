import { Box, Typography } from '@mui/material'
import React from 'react'
import ConsultHome from '../ConsultHome'

// -----------------------------------------------------------------------------------------------

export const ConsultDashHomeContent = () => {
  return (
<>

{/* ---------------------------------------- HEADER ------------------------------------------------- */}

<Box className="h-24 border-b-2 w-[100%] flex justify-between">
  <Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10'>
    Home
  </Typography>
</Box>  

{/* ------------------------------------------ REMAINING ------------------------------------------- */}



</>
  )
}

// -----------------------------------------------------------------------------------------------

const C_DashHome = () => {
  return (
    <>
    <ConsultHome/>
    </>
  )
}

export default C_DashHome
