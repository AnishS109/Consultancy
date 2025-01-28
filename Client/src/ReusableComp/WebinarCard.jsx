import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'

import img  from "../assets/images.jpg"

const WebinarCard = () => {
  return (
    <>

    <Box className="h-[320px] w-[330px] sm:w-[280px] border-[1px] rounded-[30px]">

      <Box className="flex flex-nowrap bg-[#fff6f2] p-2 gap-2 rounded-t-[30px]">
        <Avatar src={img} alt='Image'/>
        <Box>
          <Typography className='text-sm text-gray-800'>by <span className='font-bold'>Sheshwath Shenoy</span></Typography>
          <Typography className='text-xs text-gray-600'>4.9/5</Typography>
        </Box>
      </Box>

      <Box className="h-32 p-2">
        <Typography className='text-gray-800 font-bold tracking-wider'>Data Engineering</Typography>
        <Typography className='text-[13px] mt-1 text-gray-600'>AMA session on Data Engineering</Typography>
      </Box>

      <Box className="bg-[#f7f7f7] h-16 w-[280px] sm:w-[250px] ml-5 sm:ml-3 rounded-[20px] flex items-center">
        <Box className="border-2 text-center w-[50px] h-fit rounded-[10px] ml-5 sm:ml-3">
          <Typography className='font-bold text-gray-700'>Jan</Typography>
          <Typography className='font-bold text-gray-700'>25</Typography>
        </Box>
        <Typography className='text-gray-800 font-bold ml-5 sm:ml-3 text-sm'>Sat, 25 January, 2025</Typography>
      </Box>
      
      <Button 
      variant='contained'
      className='mt-4 bg-black text-white normal-case w-[300px] sm:w-[250px] ml-4 sm:ml-3 rounded-md font-bold'>
        Register
      </Button>

    </Box>
      
    </>
  )
}

export default WebinarCard
