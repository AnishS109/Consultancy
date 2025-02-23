import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useLocation } from 'react-router-dom';

const DashHeader = ({ title }) => {

  const location = useLocation()
  const activePage = location.pathname

  return (
  <>
  <Box className="h-24 sticky top-0 z-10 bg-white border-b-2 w-[100%] flex justify-between">

    <Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10 text-nowrap'>
      {title}
    </Typography>
      
  </Box>
  </>
  )
}

export default DashHeader
