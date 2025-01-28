import React from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Banner";
import StickyNavBar from "../Components/StickyNavBar";
import LookingFor from "../Components/LookingFor";

const Home = () => {

  return (
    <Layout>

      <Banner/>
      <StickyNavBar/>
      <LookingFor/>

    </Layout>
  );
};

export default Home;
