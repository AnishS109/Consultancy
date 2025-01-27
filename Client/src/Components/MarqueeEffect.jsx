import React from "react";
import img from "../assets/images.jpg"
import { Box, Typography } from "@mui/material";

const MarqueeEffect = () => {
  const techCompanies = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];

  return (
    <>

    <Box className="h-[80vh] bg-[#2f4231] w-screen pt-20 mt-10 text-center">

{/* ------------------------------------------------------------------------------------- */}

   <Typography className="text-[2rem] sm:text-[3rem] font-bold text-[#b2d99a]">The wall of love</Typography>

{/* ------------------------------------------------------------------------------------- */}

      <div className="relative overflow-hidden py-4 mt-10">
        <div className="flex items-center gap-10 w-fit animate-marqueeLTR pause-on-hover">
          {techCompanies.map((item, index) => (
            <div
              key={index}
              style={{backgroundImage:`url(${img})`}}
              className="bg-cover h-[180px] w-[280px] bg-no-repeat px-4 py-2 rounded-xl shadow-md border"
            >
            </div>
          ))}
          {techCompanies.map((item, index) => (
            <div
              style={{backgroundImage:`url(${img})`}}
              key={`duplicate-${index}`}
              className="bg-cover h-[180px] w-[280px] bg-no-repeat px-4 py-2 rounded-xl shadow-md border"
              >
            </div>
          ))}
        </div>
      </div>

{/* ------------------------------------------------------------------------------------- */}

      <div className="relative overflow-hidden py-4">
        <div className="flex items-center gap-10 w-fit animate-marqueeRTL pause-on-hover">
          {techCompanies.map((item, index) => (
            <div
              style={{backgroundImage:`url(${img})`}}
              className="bg-cover h-[180px] w-[280px] bg-no-repeat px-4 py-2 rounded-xl shadow-md border"
            >
            </div>
          ))}
          {techCompanies.map((item, index) => (
            <div
              key={`duplicate-${index}`}
              style={{backgroundImage:`url(${img})`}}
              className="bg-cover h-[180px] w-[280px] bg-no-repeat px-4 py-2 rounded-xl shadow-md border"
            >
            </div>
          ))}
        </div>
      </div>
      
{/* ------------------------------------------------------------------------------------- */}
    </Box>

    </>
  );
};

export default MarqueeEffect;
