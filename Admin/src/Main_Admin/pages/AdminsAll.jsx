import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from "../../Context/DataProvider"

import MainHome from '../MainHome'
import { Alert, Box, CircularProgress, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import Permisson from "../Components/Permisson"

export const AdminsAllContent = () => {

  const { backendUrl } = useContext(DataContext)
  const navigate = useNavigate()
  
// ----------------- USE STATES -----------------

  const [allAdmins, setAllAdmins] = useState([])
  const [modalMsg, setModalMsg] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [load, setLoad] = useState(false)

// ----------------- FETCHING ALL ADMINS -------------------

  useEffect(() => {
    const fetchingAllAdmins = async() => {
      setLoad(true)
      try {
        const response = await axios.get(`${backendUrl}/MainAdmin/Fetching-All-Admins`)
        if(response.status === 200){
          setAllAdmins(response.data)
        }
      } catch (error) {
        setModalMsg({message:error.response.data.message, open:true, severity:"error"});
      } finally {
        setLoad(false)
      }
    }
    fetchingAllAdmins()
  },[])

  return (
<>

{load ? (
  <>
  <Box className="h-full w-full flex items-center justify-center">
   <CircularProgress className="text-black" size={30} />
  </Box>
  </>
) : (
<>
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
      {allAdmins.map((admin, idx) => (
        <TableRow
          key={idx}
          sx={{ "&:hover": { backgroundColor: "grey.100" } }}
          className="cursor-pointer"
          onClick={() => navigate(`/Admin/Permissions/${admin._id}`)}
        >
          <TableCell>{idx + 1}</TableCell>
          <TableCell>{admin.name}</TableCell>
          <TableCell>{admin.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Box>
</>
)}

{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}
{/* --------------------------------- SNACKBAR --------------------------- */}

<Snackbar
  open={modalMsg.open}
  autoHideDuration={3000}
  onClose={() => setModalMsg({ ...modalMsg, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setModalMsg({ ...modalMsg, open: false })}
    severity={modalMsg.severity}
    sx={{ width: "100%" }}
  >
    <b>{modalMsg.message}</b>
  </Alert>
</Snackbar>
</>
  )
}

const AdminsAll = () => {
  return (
    <div>
      <MainHome/>
    </div>
  )
}

export default AdminsAll