import React, { useContext, useState } from "react";
import { AppBar, Box, Button, Drawer, Toolbar, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogContent, DialogActions, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";
import MenuIcon from '@mui/icons-material/Menu'; 
import HomeIcon from '@mui/icons-material/Home'; 
import InfoIcon from '@mui/icons-material/Info'; 
import ContactMailIcon from '@mui/icons-material/ContactMail'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import LoginIcon from '@mui/icons-material/Login'; 
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 

const Navbar = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const Logo =
    "https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png";

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    return window.location.pathname === path ? "active" : "";
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2", mb: "5px", transition: "background-color 0.3s ease" }}>

        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: { xs: 1, sm: 3 }, position: "relative" }}>

          {/* ----- IDA LOGO ----- */}

          <Box sx={{ height: { xs: "40px", sm: "60px", md: "60px" }, width: { xs: "150px", sm: "180px", md: "200px" }, borderRadius: "20px", bgcolor: "#e0f7fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={Logo} alt="Logo" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
          </Box>

          {/* ----- MENU BUTTON (for mobile) ----- */}

          <IconButton color="inherit" sx={{ display: { xs: "block", sm: "block", md:"none" }, transition: "all 0.3s ease" }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          {/* ----- Desktop Navigation Links ----- */}

          <Box sx={{ display: { xs: "none", sm: "none", md:"flex" }, gap: "20px" }}>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              className={`transition-colors duration-300 ease-in-out ${isActive("/") ? 'bg-white text-blue-700 font-bold' : 'hover:bg-white hover:text-blue-700 hover:font-bold'} px-4 py-2 rounded-lg`}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/about")}
              className={`transition-colors duration-300 ease-in-out ${isActive("/about") ? 'bg-white text-blue-700 font-bold' : 'hover:bg-white hover:text-blue-700 hover:font-bold'} px-4 py-2 rounded-lg`}
            >
              About
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/contact-us")}
              className={`transition-colors duration-300 ease-in-out ${isActive("/contact-us") ? 'bg-white text-blue-700 font-bold' : 'hover:bg-white hover:text-blue-700 hover:font-bold  '} px-4 py-2 rounded-lg`}
            >
              Contact Us
            </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/Register")}
                  className={`transition-colors duration-300 ease-in-out ${isActive("/Register") ? 'bg-white text-blue-700 font-bold' : 'hover:bg-white hover:text-blue-700 hover:font-bold  '} px-4 py-2 rounded-lg`}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  className="transition-colors duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:font-bold px-4 py-2 rounded-lg"
                >
                  Login
                </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ----- Drawer for Mobile ----- */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#e9f3fd",
            color: "white",
            width: 250,
            padding: "10px",
            transition: "transform 0.3s ease",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <img src={Logo} alt="Logo" style={{ maxHeight: "60px", objectFit: "contain" }} />
        </Box>

        <Box className="border-b-2 border-[#1976d2]"></Box>

        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon sx={{ color: "#1976d2" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: "#1976d2" }} />
          </ListItem>
          <ListItem button onClick={() => navigate("/about")}>
            <ListItemIcon sx={{ color: "#1976d2" }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" sx={{ color: "#1976d2" }} />
          </ListItem>
          <ListItem button onClick={() => navigate("/contact-us")}>
            <ListItemIcon sx={{ color: "#1976d2" }}>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" sx={{ color: "#1976d2" }} />
          </ListItem>
              <ListItem button onClick={() => navigate("/register")}>
                <ListItemIcon sx={{ color: "#1976d2" }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Register" sx={{ color: "#1976d2" }} />
              </ListItem>
              <ListItem button onClick={() => navigate("/login")}>
                <ListItemIcon sx={{ color: "#1976d2" }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" sx={{ color: "#1976d2" }} />
              </ListItem>
        </List>
      </Drawer>

    </Box>
  );
};

export default Navbar;
