import React from 'react'
import StudentNavBar from './StudentNavBar'
import Footer from "../../Layout/Footer"

const StudentLayout = ({ children }) => {
  return (
    <>
      
      <StudentNavBar/>
      {children}
      <Footer/>

    </>
  )
}

export default StudentLayout
