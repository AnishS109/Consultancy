import React from 'react'
import StudentHome from '../StudentHome'
import DashHeader from './DashComp/DashHeader'

export const DashFindContent = () => {

  const title = "Find Consultant"

  return (
    <>

    <DashHeader title={title}/>

    </>
  )
}

const DashFind = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashFind
