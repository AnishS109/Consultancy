import React, { useState } from "react";
import { Avatar, AvatarGroup, Box, Button, Typography } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";

import img2 from "../assets/images.png";

const Banner = () => {
  const [peopleButton, setPeopleButton] = useState(true);

  return (
    <>
      <Box className="w-screen h-auto md:h-[55vh] bg-[#F2EBE1] flex items-center flex-col text-center p-4">

{/*--------------------------------------------------------------------------------------*/}

        <Box className="flex items-center justify-between w-[80vw] md:w-fit rounded-[30px] p-2 h-16 bg-[#e5ded1] mt-6 md:mt-10">
          <Box
            onClick={() => setPeopleButton(true)}
            className={`${
              peopleButton ? "bg-white shadow-md" : "bg-transparent"
            } flex-1 flex justify-center items-center text-nowrap p-3 rounded-3xl cursor-pointer transition-all`}
          >
            <Typography
              className={`font-bold text-sm md:text-[15px] ${
                peopleButton ? "text-black" : "text-black"
              }`}
            >
              Find People
            </Typography>
          </Box>

          <Box
            onClick={() => setPeopleButton(false)}
            className={`${
              !peopleButton ? "bg-white shadow-md" : "bg-transparent"
            } flex-1 flex justify-center text-nowrap items-center p-3 rounded-3xl cursor-pointer transition-all`}
          >
            <Typography
              className={`font-semibold text-sm md:text-[15px] ${
                !peopleButton ? "text-black" : "text-black"
              }`}
            >
              Join as Expert
            </Typography>
          </Box>
        </Box>

{/*--------------------------------------------------------------------------------------*/}

        <Box className="mt-6">
          <Typography className="text-2xl text-nowrap md:text-[3.2rem] mb-4 font-extrabold tracking-tighter mt-3">
            Get referral in top companies
          </Typography>
          <Typography className="font-light text-sm  md:text-[1.4rem]">
            Microsoft, Google, Amazon, Flipkart +100 more top companies
          </Typography>
        </Box>

{/*--------------------------------------------------------------------------------------*/}

        <Box className="w-fit md:w-fit flex flex-col md:flex-row justify-center gap-4 md:gap-0 md:justify-between mt-8">
          <Button
            className="normal-case text-white mr-0 md:mr-10 text-nowrap w-fit md:w-[38vw] lg:w-[21vw] bg-black p-2 font-bold text-sm md:text-[20px] h-12 md:h-14 rounded-xl"
            endIcon={<ArrowForwardIcon />}
          >
            Referral by company
          </Button>
          <Button
            className="normal-case text-white bg-black p-2 w-full md:w-[38vw] lg:w-[21vw] font-bold text-sm md:text-[20px] h-12 md:h-14 rounded-xl"
            endIcon={<ArrowForwardIcon />}
          >
            Referral by role
          </Button>
        </Box>

{/*--------------------------------------------------------------------------------------*/}

        <Box className="flex flex-nowrap md:flex-row gap-1 md:gap-4 mt-5 w-full md:w-[40vw] justify-center md:justify-center">

          <Box className="flex flex-nowrap h-14 items-center p-2 border-[1px] border-black rounded-[30px] w-auto">
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src={img2} />
              <Avatar alt="Travis Howard" src={img2} />
              <Avatar alt="Cindy Baker" src={img2} />
              <Avatar alt="Agnes Walker" src={img2} />
            </AvatarGroup>
            <Typography className="text-sm md:text-[20px] ml-2 text-nowrap">
              <span className="font-bold">Trusted</span> by 1M+
            </Typography>
          </Box>

          <Box className="flex flex-nowrap items-center h-14 p-2 border-[1px] border-black rounded-[30px] w-auto">
            <StarIcon className="text-yellow-500 text-[20px] md:text-[30px]" />
            <Typography className="text-sm md:text-[20px] ml-2 text-nowrap">
              <span className="font-bold">4.9/5</span> Rated
            </Typography>
          </Box>

        </Box>

      </Box>
    </>
  );
};

export default Banner;
