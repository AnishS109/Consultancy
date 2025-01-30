import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, TextField, InputAdornment, Button, Avatar, Drawer, Divider } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, CardGiftcard as CardGiftcardIcon } from '@mui/icons-material';

import img from "../assets/Student.jpg";
import { useNavigate } from "react-router-dom";

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Navbar = () => {

  const navigate = useNavigate()

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [drawerOpen, SetDrawerOpen] = useState(false)

  const handleDrawerClose = () => {
    SetDrawerOpen(!drawerOpen)
  }

  return (
    <>
    <Box>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          mb: "5px",
          transition: "background-color 0.3s ease",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: { xs: 1, sm: 3 },
            position: "relative"
          }}
        >

{/* -------------------------------------------------------------------------------------- */}

          <Box className="flex items-center gap-4 sm:gap-0 sm:justify-between w-full sm:w-[80%]">

            <Typography className="text-black text-[1.5rem] font-semibold">
              Logo
            </Typography>

{/* -------------------------------------------------------------------------------------- */}

            <Box className="hover:border-[1px] border-[1px] hover:border-black rounded-[50%] transition-all p-[3px]">
            <SearchIcon className="sm:hidden text-black cursor-pointer" />
            </Box>


            <TextField
              variant="outlined"
              placeholder="Search here"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="cursor-pointer">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: { borderRadius: "30px", height: "6vh" }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  height: "6vh"
                },
              }}
              className="hidden sm:block sm:mr-2 md:mr-0"
            />
          </Box>

{/* -------------------------------------------------------------------------------------- */}

          <Box 
          onClick={() => SetDrawerOpen(true)}
          className="flex items-center justify-between gap-2 sm:gap-6 text-nowrap">

            <Box className="flex items-center justify-around border-stone-200 hover:border-gray-400 p-2 border-2 h-[50px] rounded-3xl cursor-pointer">
              <Avatar src={img} className="text-xl" />
              <MenuIcon className="text-black text-[20px]" />
            </Box>
          </Box>

        </Toolbar>

      </AppBar>

    </Box>

{/* -------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------- */}

  <Drawer
    anchor="right" 
    open={drawerOpen}
    onClose={handleDrawerClose} 
    sx={{
      "& .MuiDrawer-paper": {
        width: {xs:"240px", sm:"320px"},
        bgcolor: "white", 
      },
    }}
  >

  <Box className="flex flex-col items-center">

{/* -------------------------------------------------------------------------------------- */}

    <Typography className="text-black mt-10 text-[2rem] font-bold">Logo</Typography>
    
    <Box className="px-4 h-1 w-full mt-6">
    <Box className="border-b-2 border-gray-300 h-1 w-full"></Box>
    </Box>

{/* -------------------------------------------------------------------------------------- */}

    <Box className="flex flex-col w-[80%] mt-4">

      <Typography className="font-semibold py-5 text-center text-black uppercase">For Seekers</Typography>

      <Button 
      startIcon={<LoginIcon />}
      onClick={() => navigate("/login")}
      className="text-black normal-case text-[1.1rem] hover:bg-gray-200">
        Sign In
      </Button>

      <Button 
      onClick={() => navigate("/Student/Register")}
      startIcon={<LogoutIcon />}
      className="text-black normal-case text-[1.1rem] hover:bg-gray-200">
        Sign up
      </Button>

    </Box>

{/* -------------------------------------------------------------------------------------- */}
    <Box className="flex flex-col w-[80%]">

      <Typography className="font-semibold py-5 text-center text-black uppercase">For Experts</Typography>

      <Button 
      startIcon={<LoginIcon />}
      onClick={() => navigate("/login")}
      className="text-black normal-case text-[1.1rem] hover:bg-gray-200">
        Sign In
      </Button>

      <Button 
      onClick={() => navigate("/Consultant/Register")}
      startIcon={<LogoutIcon />}
      className="text-black normal-case text-[1.1rem] hover:bg-gray-200">
        Sign up
      </Button>

      <Button 
      startIcon={<MonetizationOnIcon/>}
      className="text-black normal-case text-[1.1rem] hover:bg-gray-200">
        Pricing
      </Button>
      
      <Button 
      startIcon={<NoteAddIcon/>}
      className="text-black normal-case text-[1.1rem] hover:bg-gray-200">
        Start your page
      </Button>

    </Box>
  </Box>
{/* -------------------------------------------------------------------------------------- */}

  <Box className="px-4 h-1 w-full mt-6 absolute bottom-0 mb-16">
    <Box className="border-b-2 border-gray-300 h-1 w-full"></Box>
  </Box>

  <Box className="absolute bottom-0 ml-16 sm:ml-14 mb-5">

    <Typography className="text-black font-bold text-[16px] sm:text-[18px]">
      {today}
    </Typography>

  </Box>

{/* -------------------------------------------------------------------------------------- */}

</Drawer>


    </>
  );
};

export default Navbar;