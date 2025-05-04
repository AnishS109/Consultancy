import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import DataProvider from "./Context/DataProvider";
import Permisson from "./Main_Admin/Components/Permisson";
import Consultant from "./Main_Admin/pages/Consultant";
import ConsultDetails from "./Main_Admin/Components/ConsultDetails";
import AddAdmin from "./Main_Admin/pages/AddAdmin";
import ChangePass from "./Main_Admin/Components/ChangePass";

const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Home = lazy(() => import("./Main_Admin/MainHome"))

function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <Box className="flex justify-center items-center h-screen">
              <CircularProgress size={60} />
            </Box>
          }
        >

        <Routes>

        {/* ------------------- PUBLIC ROUTES ---------------------- */}

          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          
        {/* --------------------- MAIN ADMIN ROUTES ---------------- */}

          <Route path="/Admin" element={<Home/>}/>
          <Route path="/Admin/Permissions/:id" element={<Permisson/>}/>
          <Route path="/Add-Admin" element={<AddAdmin/>}/>

        {/* --------------- BOTH ADMIN ROUTES ----------------- */}

          <Route path="/Consultants" element={<Consultant/>}/>
          <Route path="/Consultant/Details/:id" element={<ConsultDetails/>}/>

        {/* ----------------------- SUB-ADMIN ROUTES ---------------------- */}

          <Route path="/Change-Password" element={<ChangePass/>}/>

        </Routes>
        </Suspense>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
