import React from "react";
import { AppBar, Box, Toolbar, Typography, TextField, InputAdornment, Button, Avatar } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, CardGiftcard as CardGiftcardIcon } from '@mui/icons-material';

import img from "../assets/Student.jpg";

const Navbar = () => {

  return (
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
          <Box className="flex items-center justify-between gap-2 sm:gap-6 text-nowrap">
            <Button
              className="text-white normal-case h-[5vh] sm:h-[6vh] bg-black font-bold text-[1rem] sm:text-[1.2rem]"
              startIcon={<CardGiftcardIcon />}
            >
              Sign up
            </Button>

{/* -------------------------------------------------------------------------------------- */}

            <Box className="flex items-center justify-around border-stone-200 p-2 border-2 h-[50px] rounded-3xl cursor-pointer">
              <Avatar src={img} className="text-xl" />
              <MenuIcon className="text-black text-[20px]" />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
