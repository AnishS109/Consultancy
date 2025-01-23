import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import { Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Student_IMG from "../assets/images.png";
import Consultant_IMG from "../assets/Student.jpg";
import { DataContext } from "../Context/DataProvider";

const Register = () => {

  const { setAccount, account } = useContext(DataContext);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setAccount({...account, role});  // Set the role based on the selected option
  }

  return (
    <>
<Layout>
<Box
        sx={{
          border: '2px solid #1976d2',
          bgcolor: 'white',
          borderRadius: '8px',
          height: 'auto',
          width: '80%',
          maxWidth: '700px',
          my: '100px',
          mx: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          backgroundColor: '#f0f8ff',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: '10px',
            mb: '40px',
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            color: '#333',
          }}
        >
          Join as a Student or Consultant
        </Typography>

        {/* Roles Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 3,
            width: {
              xs: '70vw',
              sm: '60vw',
              md: '38vw',
            },
          }}
        >
          {/* Student */}
          <NavLink to={"/Student/Register"}>
          <Box
            className="relative h-32 w-32 sm:h-44 sm:w-44 bg-cover bg-center rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundImage: `url(${Student_IMG})` }}
            onClick={() => handleRoleSelect("Student")}
          >
            <Typography
              variant="h6"
              className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-2 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
            >
              Student
            </Typography>
          </Box>
          </NavLink>

          {/* Consultant */}
          <NavLink to={"/Consultant/Register"}>
          <Box
            className="relative h-32 w-32 sm:h-44 sm:w-44 bg-cover bg-center rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundImage: `url(${Consultant_IMG})` }}
            onClick={() => handleRoleSelect("Consultant")}
          >
            <Typography
              variant="h6"
              className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-2 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
            >
              Consultant
            </Typography>
          </Box>
          </NavLink>
        </Box>
      </Box>
      </Layout>
    </>
  )
}

export default Register
