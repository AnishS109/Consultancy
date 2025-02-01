import React from 'react'
import StudentHome from '../StudentHome'
import DashHeader from './DashComp/DashHeader'

export const DashProfileContent = () => {

  const title = "Profile"

  return (
    <>

    <DashHeader title={title}/>

    </>
  )
}

const DashProfile = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashProfile
