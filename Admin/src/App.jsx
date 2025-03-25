import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))

function App() {

  return (
<BrowserRouter>
  <Suspense
    fallback={
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress size={60} />
      </Box>
    }
  >
    <Routes>

      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>

    </Routes>
  </Suspense>
</BrowserRouter>
  );
}

export default App;
