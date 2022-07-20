import React, { useState } from 'react'
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import styles from './SubMenu.module.scss'



export const SubMenuItem = ({title = 'le titre', childs, incrementCurrentStep, step, currentStep}) => {

    const [showChidls, setShowChilds] = useState(false)

    const handleClick = () => {

      if((childs.length > 0)){
        setShowChilds(true)
      }

    }


    useEffect(() => {

    },[])
  return (
    <div key={uuidv4()} className={styles.globalContainer}>
       
      <h2  key={uuidv4()} className={styles.title} onClick = {handleClick}> {title} current step {step} </h2>

      {showChidls &&
      <div  key={uuidv4()} className={styles.conatinerChild} > 

      {childs.map((child) => (
        <div  key={uuidv4()}>
            
        <SubMenuItem
          step={step+1}
          incrementCurrentStep = {incrementCurrentStep}
          key={uuidv4()}
          childs={child.childs}
          title={child.title}
          currentStep = {currentStep}
        />


        </div>
      ))}
      </div> 
}
    </div>
  )
}
export default SubMenuItem
