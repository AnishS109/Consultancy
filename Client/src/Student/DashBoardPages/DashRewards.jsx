import React from 'react'
import StudentHome from '../StudentHome'
import DashHeader from './DashComp/DashHeader'

export const DashRewardsContent = () => {

  const title = "Rewards"

  return (
    <>

    <DashHeader title={title}/>

    </>
  )
}

const DashRewards = () => {
  return (
    <div>
      <StudentHome/>
    </div>
  )
}

export default DashRewards
