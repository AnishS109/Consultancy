import React, { useContext } from 'react'
import StudentHome from '../StudentHome'
import DashHeader from './DashComp/DashHeader'
import { Box, Button, Typography } from '@mui/material'
import { DataContext } from '../../Context/DataProvider'

import dollarCoin from "../../assets/discount.svg"
import kbc from "../../assets/amitji.svg"
import headPhone from "../../assets/headphone.svg"
import leaderBoard from "../../assets/leaderboard.svg"

const data = [
  {
    img: leaderBoard,
    tagLine:"Win ₹1,000 Daily",
    line:"See if you are winning today",
    buttonName:"Try here"
  },
  {
    img: kbc,
    tagLine:"Play KBC with Amit AI",
    line:"Toh chaliye shuru karte hai",
    buttonName:"Try here"
  },
  {
    img: dollarCoin,
    tagLine:"15% OFF | Code: seektime",
    line:"on making a booking on Grookit",
    buttonName:"Find Consults"
  },
  {
    img: headPhone,
    tagLine:"Join our Giveaways",
    line:"Exciting give aways every day",
    buttonName:"Join"
  },
]

export const DashHomeContent = () => {

  const { account } = useContext(DataContext)

  const title = "Home"

  return (
  <>
  <Box className="flex flex-col w-[100%]">
    <DashHeader title={title}/>

{/* ----------------------------------------------------------------------------------- */}

  <Box className="flex flex-col items-center w-[100%] h-[100%] py-20">

    <Typography>
      {<span className='text-[1.7rem] sm:text-[2.rem] tracking-tight font-bold'>{`Hi ${account.name}`}</span> || <span className='text-[1.7rem] sm:text-[2rem] text-red-500'>Something went wrong! Please login Again</span>}
    </Typography>

    <Box className="flex flex-col items-center mt-5">
      <Typography className='text-gray-700 tracking-wider text-[13px] sm:text-[17px]'>
        You can access your booking details via registered email.
      </Typography>
      <Typography className='text-gray-700 tracking-wider text-[13px] sm:text-[17px]'>
        In the meantime enjoy a few delights!
      </Typography>
    </Box>

{/* ----------------------------------------------------------------------------------- */}

  {data.map((items) => (
    <Box key={items.tagLine} className="flex h-20 sm:h-24 w-[385px] sm:w-[80vw] md:w-[60vw] border-[1px] mx-5 rounded-[20px] items-center px-2 mt-4">
    <img 
    className='h-16 sm:h-20'
    src={items.img} alt="Bit Coin Image" />
    
    <Box className="flex flex-col ml-4 sm:ml-6">
    <Typography className='text-[11px] sm:text-[17px] font-semibold'>
      {items.tagLine}
    </Typography>
    <Typography className='text-[11px] sm:text-[16px] text-gray-600'>
      {items.line}
    </Typography>
    </Box>

    <Button
    variant='outlined'
    className="w-[150px] normal-case px-3 sm:px-6 py-1 sm:py-2 rounded-[10px] ml-2 sm:ml-auto  bg-black text-white font-bold hover:bg-transparent hover:text-black hover:border-black transition-all">
      <span className='text-[14px] sm:text-auto text-nowrap'>{items.buttonName}</span>
    </Button>
  </Box>
  ))}

{/* ----------------------------------------------------------------------------------- */}

  </Box>

  </Box>
  </>
  )
}

const DashHome = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashHome