import axios from "axios"
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import  { DataContext } from "../Context/DataProvider"
import Navbar from "../Layout/NavBar"
import { Box } from "@mui/material"

const ConsultPackage = () => {

// --------- FETCHING PARAMS FROM URL -------------

  const {id, Package} = useParams()

// --------- FROM CONTEXT API -------------

  const { backendUrl } = useContext(DataContext)

// --------- FETCHING PACKAGE DETAILS -------------

useEffect(() => {
  const fetch = async() => {
    try {
      const response = await axios.get(`${backendUrl}/Consult/Fetching-Package-Details-By-ID`, {
        params:{id}
      })
      if(response.status === 200){
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  fetch()
},[])

  return (
<>
<Navbar/>
<Box className="h-[100vh] w-[100vw] bg-[#93c5f9]">

</Box>
</>
  )
}

export default ConsultPackage
