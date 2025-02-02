import React, { useContext, useEffect, useState } from 'react'
import StudentHome from '../StudentHome'
import DashHeader from './DashComp/DashHeader'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import axios from "axios"
import { DataContext } from '../../Context/DataProvider'

export const DashFindContent = () => {

  const {backendUrl} = useContext(DataContext)

  const [consultants, setConsultants] = useState([])

  useEffect(() => {
    const fetchConsulants = async() => {
      try {
        const response = await axios.get(`${backendUrl}/Student/fetching-consultants`)
        if(response.status === 200){
          setConsultants(response.data)
          console.log(response.data)
        }
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
    fetchConsulants()
  },[])

  const title = "Find Consultant"

  return (
    <>
<DashHeader title={title}/>

<Box className = "flex gap-3 p-4 flex-wrap justify-center">
{consultants.map((items) => (
  <Card
    key={items._id}
    className="w-[300px]"
    sx={{ borderRadius: 2, boxShadow: 3 }}
  >
    <CardMedia
      component="img"
      className="h-40 w-full object-contain"
      image={items.consultImage}
      alt={items.name}
    />
    <CardContent className="text-center">
      <Typography variant="h6" fontWeight="bold">
        {items.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Country: {items.countryName}
      </Typography>
    </CardContent>
  </Card>
))}
</Box>

    </>
  )
}

const DashFind = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashFind
