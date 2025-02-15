import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const ConsultProfile = () => {

  const { id } = useParams()

  return (
    <div>
      {id}
    </div>
  )
}

export default ConsultProfile
