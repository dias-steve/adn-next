import React from 'react'
import { useState } from 'react'
import SubMenuItem from '../SubMenuItem/SubMenuItem'
import styles from './MenuMultiSteps.module.scss'

export default function MenuMultiSteps() {

  const [currentStep, setCurrentStep] = useState(0);
  const path = []
  
  const handlePrev = () => {

  }
  const handleAddPath = () => {

  }
  const incrementCurrentStep = () => {
    setCurrentStep(currentStep+1)
  }

  
  const childs = [
    {title: "childTitle1",
     childs:[
      {title: "childTitle3", childs:[]},
      {title: "childTitle4", childs:[]}
      ]
    },
    {title: "childTitle2",childs:[]}
  ]
  return (
    <div className={styles.globalContainer}>
        <p onClick= {handlePrev} >{currentStep}</p>
        <SubMenuItem 
          step={0} 
          incrementCurrentStep={incrementCurrentStep} 
          title = {'racine'} 
          childs={childs}
          
          currentStep = {currentStep}
          
          />
    </div>
  )
}
