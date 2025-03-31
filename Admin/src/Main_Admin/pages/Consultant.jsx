import React, { useContext, useEffect, useState } from 'react'
import MainHome from '../MainHome'
import { DataContext } from '../../Context/DataProvider'
import axios from 'axios'
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ConsultantCOntent = () => {

  const { backendUrl } = useContext(DataContext)
  const navigate = useNavigate()

// ------------------- USE STATES ----------------------

  const [consult, setConsult] = useState([])
  const [load, setLoad] = useState(false)

// ----------------- FETCHING CONSULTANTS ---------------

  useEffect(() => {
    const fetching = async() => {
      setLoad(true)
      try {
        const response = await axios.get(`${backendUrl}/MainAdmin/Fetching-Consultants`)
        if(response.status === 200){
          setConsult(response.data)
        }
      } catch (error) {
        console.log(error.response.data.message)
      } finally {
        setLoad(false)
      }
    }
    fetching()
  },[backendUrl])

  return (
    <>
    {load ? (
  <>
  <Box className="h-full w-full flex items-center justify-center">
   <CircularProgress className="text-black" size={30} />
  </Box>
  </>
) : consult.length === 0 ? (
  <>
  <Typography className='text-xl font-semibold text-center mt-4'>
    No Consultant Available for Verification
  </Typography>
  </>
) : (
  <Box className="p-4">
  <Table sx={{ minWidth: 700 }} aria-label="student details table">
  <TableHead sx={{ backgroundColor: 'grey.200' }}>
    <TableRow>
      <TableCell><Typography variant="body1" fontWeight="bold">ID</Typography></TableCell>
      <TableCell><Typography variant="body1" fontWeight="bold">Name</Typography></TableCell>
      <TableCell><Typography variant="body1" fontWeight="bold">Email</Typography></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {consult.map((con, idx) => (
    <TableRow
      key={idx}
      sx={{ "&:hover": { backgroundColor: "grey.100" } }}
      className="cursor-pointer"
      onClick={() => navigate(`/Consultant/Details/${con._id}`)}
    >
      <TableCell>{idx + 1}</TableCell>
      <TableCell>{con.name}</TableCell>
      <TableCell>{con.email}</TableCell>
    </TableRow>
    ))}
      </TableBody>
  </Table>
  </Box>
)}
    </>
  )
}

const Consultant = () => {
  return (
    <div>
      <MainHome/>
    </div>
  )
}

export default Consultant