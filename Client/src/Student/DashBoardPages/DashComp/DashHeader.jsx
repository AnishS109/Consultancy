import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const DashHeader = ({ title }) => {
  return (
  <>
  <Box className="h-24 border-b-2 w-[100%] flex justify-between">

    <Typography className='text-gray-700 font-bold text-[2rem] py-6 px-10 text-nowrap'>
      {title}
    </Typography>

    <Button
    variant='outlined'
    className='bg-[#008060] my-6 mx-10 h-12 text-white normal-case font-extrabold flex gap-2 rounded-[30px]'
    >
      <span><LeaderboardIcon className='text-[#ffff00]'/></span><span className='tracking-tight'>Leaderboard</span>
    </Button>
      
  </Box>
  </>
  )
}

export default DashHeader
