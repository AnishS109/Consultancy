import { Box, Button, Typography } from "@mui/material";
import React from "react"

import WebinarCard from "../ReusableComp/WebinarCard"
import HomeCardd_2 from "../ReusableComp/HomeCardd_2";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LookingFor = () => {

  const InitialValues = ["1","2","3","4"]

  const Referral_in_15 = ["1","2","3","4","5","6","7","8","9","10"]

  return (
    <>
    <Box className="bg-gray-100 mt-20 pt-16 pb-32">

    <Typography className="ml-2 sm:ml-12 text-[1.8rem] sm:text-[4rem] tracking-tighter font-bold text-[#3b3b3b]">
      Looking for more than 1:1s? 
    </Typography>

    <Typography className="ml-2 sm:ml-12 mt-2 sm:mt-0 text-sm sm:text-lg text-[#3b3b3b] font-semibold">
      Start easy with live webinars or go all in with long term packages
    </Typography>

    <Typography className="mt-12 text-center ml-2 sm:ml-12 text-[#3b3b3b] font-bold text-[1.3rem] sm:text-[1.9rem] tracking-tighter mb-5">
      Upcoming Webinars
    </Typography>

    <Box className="flex flex-wrap gap-8 sm:gap-4 justify-center">
      {InitialValues.map((items) => (
        <WebinarCard key={items}/>
      ))}
    </Box>

    <Box className="flex justify-center mt-8">
      <Button
      variant="outlined"
      className="border-gray-600 normal-case rounded-[10px] font-semibold text-[17px] text-gray-600">
        See More
      </Button>
    </Box>

    <Typography className="mt-12 ml-2 text-center sm:ml-12 text-[#3b3b3b] font-bold text-[1.3rem] sm:text-[1.9rem] tracking-tighter mb-5">
      End to end packages
    </Typography>

    <Box className="flex flex-wrap gap-8 sm:gap-4 justify-center">
      {InitialValues.map((items) => (
        <WebinarCard key={items}/>
      ))}
    </Box>

    <Box className="flex justify-center mt-8">
      <Button
      variant="outlined"
      className="border-gray-600 normal-case rounded-[10px] font-semibold text-[17px] text-gray-600">
        See More
      </Button>
    </Box>

    </Box>

{/* ------------------------------------------------------------------------------------------*/}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
    Service based Mock Interviews. <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
      {Referral_in_15.map((items) => (
        <HomeCardd_2 key={items} />
      ))}
    </div>
    </Box>

{/* ------------------------------------------------------------------------------------------*/}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
    Mock Interview(Free). <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
      {Referral_in_15.map((items) => (
        <HomeCardd_2 key={items} />
      ))}
    </div>
    </Box>

{/* ------------------------------------------------------------------------------------------*/}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
    Most Visited. <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
      {Referral_in_15.map((items) => (
        <HomeCardd_2 key={items} />
      ))}
    </div>
    </Box>

{/* ------------------------------------------------------------------------------------------*/}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
    Get a Referral in Microsoft(Free). <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
      {Referral_in_15.map((items) => (
        <HomeCardd_2 key={items} />
      ))}
    </div>
    </Box>

    </>
  )
}

export default LookingFor;