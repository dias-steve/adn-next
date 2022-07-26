import React from 'react'

export default function Spinner({blackCircle}) {

  return (
    <div className="wrapper-spinner">
        <div className={`spin spin${blackCircle ? '-black': '-white'}`}></div>
    </div>
   
  )
}
