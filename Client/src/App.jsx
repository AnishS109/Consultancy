import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import DataProvider, { DataContext } from "./Context/DataProvider";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const ConsultHome = lazy(() => import("./Consult/ConsultHome"));
const StudentHome = lazy(() => import("./Student/StudentHome"));
const AdminHome = lazy(() => import("./Admin/AdminHome"));
const StudentRegister = lazy(() => import("./Pages/StudentRegister"));
const ConsultantRegister = lazy(() => import("./Pages/ConsultantRegister"));
// const ContactUs = lazy(() => import("./Pages/ContactUs"));
// const About = lazy(() => import("./Pages/About"));
// const Register = lazy(() => import("./Pages/Register"));

function App() {
  
  const StudentRoutes = () => {
    const { account } = useContext(DataContext);
    return account.name && account.role === "Student" ? <Outlet /> : <Navigate to="/" />;
  };
  
  const ConsultantRoutes = () => {
    const { account } = useContext(DataContext);
    return account.name && account.role === "Consultant" ? <Outlet /> : <Navigate to="/" />;
  };
  
  const AdminRoutes = () => {
    const { account } = useContext(DataContext);
    return account.name && account.role === "Admin" ? <Outlet /> : <Navigate to="/" />;
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

            {/* ------------------- PROTECTED ROUTES ----------------------- */}
            
            {/*-------------------- STUDENT ROUTES --------------------------*/}
            <Route element={<StudentRoutes />}>
              <Route path="/Student/Home" element={<StudentHome />} />
            </Route>

            {/*-------------------- CONSULTANT ROUTES --------------------------*/}
            <Route element={<ConsultantRoutes />}>
              <Route path="/Consultant/Home" element={<ConsultHome />} />
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
