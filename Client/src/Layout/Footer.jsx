import React from "react";
import { Box, Typography } from "@mui/material";

import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      className="w-screen h-auto"
      sx={{
        backgroundColor: "rgb(21, 21, 21)",
        color: "white",
        padding: { xs: "20px 10px", sm: "20px 20px" },
        mt: "5px",
        position: "relative",
      }}
    >
      {/* -------------------------------------------------------------------------------------- */}
      
      <Box className="flex flex-col sm:flex-row justify-between py-6 sm:py-12 px-6 sm:px-16">
        {/* Logo */}
        <Box className="mb-6 sm:mb-0">
          <Typography className="text-4xl sm:text-[70px] font-bold">IDA LOGO</Typography>
        </Box>

        {/* Links */}
        <Box className="flex flex-col sm:flex-row gap-8 sm:gap-14">
          <Box className="flex flex-col gap-4">
            <Box className="hover:text-gray-300 cursor-pointer">About</Box>
            <Box className="hover:text-gray-300 cursor-pointer">Contact Us</Box>
            <Box className="hover:text-gray-300 cursor-pointer">Terms Of Service</Box>
            <Box className="hover:text-gray-300 cursor-pointer">Privacy</Box>
          </Box>
          <Box className="flex flex-col gap-4">
            <Box className="hover:text-gray-300 cursor-pointer">Pricing</Box>
            <Box className="hover:text-gray-300 cursor-pointer">Box</Box>
          </Box>
        </Box>
      </Box>

      {/* -------------------------------------------------------------------------------------- */}

      <Box className="px-6 sm:px-16 mb-8">
        <Box className="flex flex-nowrap items-center border-[1px] border-white p-4 w-fit rounded-[30px] cursor-pointer hover:bg-gray-700">
          <StarIcon className="text-[1.4rem] mr-3 text-yellow-500" />
          <Typography className="text-sm sm:text-[1.1rem]">Top Profiles <KeyboardArrowDownIcon /></Typography>
        </Box>
      </Box>

      {/* -------------------------------------------------------------------------------------- */}

      <Box className="px-6 sm:px-16 sm:pr-28 mb-12 flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <Box className="text-center sm:text-left">
          <Typography className="mt-4 text-sm sm:text-base">
            548 Market St PMB 30073, San Francisco
          </Typography>
          <Typography className="mt-2 text-sm sm:text-base">
            ©2025 Topmate
          </Typography>
        </Box>

        {/* Social Media Section */}
        <Box className="flex gap-4 mt-4 sm:mt-0">
          <LinkedInIcon className="text-[2rem] sm:text-[3rem] cursor-pointer hover:text-blue-500" />
          <TwitterIcon className="text-[2rem] sm:text-[3rem] cursor-pointer hover:text-blue-400" />
          <InstagramIcon className="text-[2rem] sm:text-[3rem] cursor-pointer hover:text-pink-500" />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
