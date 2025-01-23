import React from 'react'
import ConsultantNavBar from './ConsultantNavBar'
import Footer from '../../Layout/Footer'

const ConsultantLayout = ({ children }) => {
  return (
    <>

    <ConsultantNavBar/>
    {children}
    <Footer/>
      
    </>
  )
}

export default ConsultantLayout
