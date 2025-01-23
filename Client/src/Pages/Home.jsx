import React, { useContext } from "react";
import Layout from "../Layout/Layout";
import { Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Student_IMG from "../assets/images.png";
import Consultant_IMG from "../assets/Student.jpg";
import { DataContext } from "../Context/DataProvider";

const Home = () => {

  return (
    <Layout>
     <h1 className="h-[500px] text-center text-5xl font-bold">Home</h1>
    </Layout>
  );
};

export default Home;
