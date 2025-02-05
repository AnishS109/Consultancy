import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material"

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeCards from '../ReusableComp/HomeCards';
import MarqueeEffect from './MarqueeEffect';
import HomeCardd_2 from '../ReusableComp/HomeCardd_2';
import { DataContext } from '../Context/DataProvider';

const StickyNavBar = () => {

  const NavTitles = ["Referral in 15 Mins", "Premium Picks", "Resume Preview", "Resume Review(Free)", "Service based Mock Interviews", "Mock Interview", "Mock Interview(Free)", "Most Visited", "Data", "Career", `Hot Sellers`, "Software", "Product", "Community Icons", "Get a Referral in Microsoft(Free)", "Get a Referral in Walmart(Free)", "Get a Referral in Google(Free)", "Study Abroad Planning", "Immigation Law", "Visa Guidance", "Get a Referral in Amazon(Free)"]

  // const Referral_in_15 = ["1","2","3","4","5","6","7","8","9","10"]

// --------------------------------------------------------------------

  const { backendUrl } = useContext(DataContext)

// --------------------------------------------------------------------

  const [consulData, setConsulData] = useState([])

// --------------------------------------------------------------------

  useEffect(() => {
    const fetchConsultant = async() => {
      try {
        const response = await axios.get(`${backendUrl}/Student/fetching-consultants`)
        if(response.status === 200){
          setConsulData(response.data)
        }
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
    fetchConsultant()
  },[])

  return (
    <>
    <Box className="h-16 border-b-[1px] bg-white border-[#ada9a9] flex gap-2 sticky top-0 z-50">

{/* --------------------------------------------------------------------------------------------- */}

      <Box className="flex gap-1 sm:gap-4 border-r-[1px] border-[#ada9a9] w-[38vw] sm:w-fit h-16 p-[10px] ml-0 sm:ml-12">

        <Button 
        className='text-gray-700 h-11 normal-case border-black rounded-[30px] p-1 text-[12px] sm:text-[16px] hover:text-black'
        variant='outlined'
        >
          <span><FilterAltIcon className='text-black text-[18px] sm:text-[25px] sm:pb-1'/></span>Filters
        </Button>

        <Button
        className='text-gray-700 h-11 normal-case text-nowrap p-1 border-black rounded-[30px] text-[12px] sm:text-[16px]  hover:text-black'
        variant='outlined'
        >
        Sort by<span><KeyboardArrowDownIcon className='text-black text-[18px]'/></span>
        </Button>

      </Box>

{/* --------------------------------------------------------------------------------------------- */}

    <Box className="flex gap-1 sm:gap-4 p-2 overflow-x-auto w-full h-full scroll-smooth scrollbar-hide justify-between whitespace-nowrap flex-nowrap items-center">

      <Button
      className='text-white bg-black rounded-[30px] p-2 text-lg normal-case font-bold'
      variant='contained'>
        All
      </Button>

      <Box className="flex gap-2 sm:gap-4 px-2">
      {NavTitles.map((items, idx) => (
        <Button
          key={idx}
          variant="outlined"
          className="normal-case text-black border-black rounded-[30px] h-11 hover:bg-black hover:text-white transition-all"
        >
          {items}
      </Button>
      ))}
      </Box>

    </Box>
    </Box>
{/* --------------------------------------------------------------------------------------------- */}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
      Referral in 15 mins. <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>


    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
      {consulData.map((items) => (
        <HomeCards key={items._id} item={items} />
      ))}
    </div>
    </Box>

{/* --------------------------------------------------------------------------------------------- */}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
      Premium Picks. <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
      {consulData.map((items) => (
        <HomeCards key={items._id} item={items} />
      ))}
    </div>
    </Box>

{/* --------------------------------------------------------------------------------------------- */}

    <MarqueeEffect/>

{/* --------------------------------------------------------------------------------------------- */}

    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
      Resume Review. <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
    {consulData.map((items) => (
        <HomeCards key={items._id} item={items} />
      ))}
    </div>
    </Box>

{/* --------------------------------------------------------------------------------------------- */}
    
    <Box>
    <Typography className='text-[1.1rem] sm:mt-7 mt-7 sm:text-[1.7rem] font-bold ml-2 sm:ml-12'>
    Resume Review(Free). <span className='cursor-pointer border-b-[2px] border-black font-thin'>See all</span><ArrowForwardIcon className='cursor-pointer'/>
    </Typography>
    </Box>

    <Box className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 w-fit pl-2 sm:pl-12 pr-3 mt-7 overflow-x-auto scroll-smooth scrollbar-hide">
    {consulData.map((items) => (
        <HomeCards key={items._id} item={items} />
      ))}
    </div>
    </Box>

    </>
  )
}

export default StickyNavBar
