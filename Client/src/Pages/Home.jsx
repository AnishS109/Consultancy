import React from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Banner";
import StickyNavBar from "../Components/StickyNavBar";
import { Box } from "@mui/material";
import HomeCards from "../ReusableComp/HomeCards";
import MarqueeEffect from "../Components/MarqueeEffect";

const Home = () => {

  return (
    <Layout>

      <Banner/>
      <StickyNavBar/>

    </Layout>
  );
};

export default Home;
