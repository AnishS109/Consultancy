import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import DataProvider, { DataContext } from "./Context/DataProvider";

import DashHome from "./Student/DashBoardPages/DashHome";
import DashBookings from "./Student/DashBoardPages/DashBookings";
import DashFind from "./Student/DashBoardPages/DashFind";
import DashProfile from "./Student/DashBoardPages/DashProfile";
import DashRewards from "./Student/DashBoardPages/DashRewards";
import C_DashHome from "./Consult/ConsultPages/C_DashHome";
import C_DashProfile from "./Consult/ConsultPages/C_DashProfile";
import ConsultProfile from "./Components/ConsultProfile";
import C_Availability from "./Consult/ConsultPages/C_Availability"
import C_Package from "./Consult/ConsultPages/C_Package";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const ConsultHome = lazy(() => import("./Consult/ConsultHome"));
const StudentHome = lazy(() => import("./Student/StudentHome"));
const AdminHome = lazy(() => import("./Admin/AdminHome"));
const StudentRegister = lazy(() => import("./Pages/StudentRegister"));
const ConsultantRegister = lazy(() => import("./Pages/ConsultantRegister"));
const ConsultPackage = lazy(() => import("./Components/ConsultPackage"));
// const ContactUs = lazy(() => import("./Pages/ContactUs"));
// const About = lazy(() => import("./Pages/About"));
// const Register = lazy(() => import("./Pages/Register"));

function App() {
  
  const StudentRoutes = () => {
    const { account } = useContext(DataContext);
    return account.name && account.role === "Student" ? <Outlet /> : <Navigate to="/Login" />;
  };
  
  const ConsultantRoutes = () => {
    const { account } = useContext(DataContext);
    return account.name && account.role === "Consultant" ? <Outlet /> : <Navigate to="/Login" />;
  };
  
  const AdminRoutes = () => {
    const { account } = useContext(DataContext);
    return account.name && account.role === "Admin" ? <Outlet /> : <Navigate to="/login" />;
  };

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
            {/* ------------------- PUBLIC ROUTES ----------------------- */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Student/Register" element={<StudentRegister />} />
            <Route path="/Consultant/Register" element={<ConsultantRegister />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Profile/:name?/:id" element={<ConsultProfile />} />
            <Route path="/:Package/:id" element={<ConsultPackage />} />

            {/* ------------------- PROTECTED ROUTES ----------------------- */}
            
            {/*-------------------- STUDENT ROUTES --------------------------*/}
            <Route element={<StudentRoutes />}>
              <Route path="/student/dashboard/home" element={<DashHome />} />
              <Route path="/student/dashboard/bookings" element={<DashBookings />} />
              <Route path="/student/dashboard/find" element={<DashFind />} />
              <Route path="/student/dashboard/profile" element={<DashProfile />} />
              <Route path="/student/dashboard/rewards" element={<DashRewards />} />
            </Route>

            {/*-------------------- CONSULTANT ROUTES --------------------------*/}
            <Route element={<ConsultantRoutes />}>
              <Route path="/consultant/dashboard/home" element={<C_DashHome />} />
              <Route path="/consultant/dashboard/profile" element={<C_DashProfile />} />
              <Route path="/consultant/dashboard/availability" element={<C_Availability />} />
              <Route path="/consultant/dashboard/package" element={<C_Package />} />
            </Route>

            {/*-------------------- ADMIN ROUTES --------------------------*/}
            <Route element={<AdminRoutes />}>
              <Route path="/Admin/Home" element={<AdminHome />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
