import React from 'react'
import StudentHome from '../StudentHome'
import DashHeader from './DashComp/DashHeader'

export const DashBookingsContent = () => {

  const title = "Bookings"

  return (
    <>

    <DashHeader title={title}/>
    
    </>
  )
}

const DashBookings = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashBookings
