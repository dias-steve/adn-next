import React from 'react'

import Header from './../Header'
export default function Container({children}) {
  return (
    <>  

        <Header/>
        
        {children}
    </>
  )
}
