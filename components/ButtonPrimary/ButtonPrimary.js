import React from 'react'
import styles from './ButtonPrimary-component-styles.module.scss'
export default function ButtonPrimary({label, handleClick, black = false, border,     isSubmit}) {
  
  return (
    
    <button className={styles.ButtonPrimary} type={isSubmit ? 'submit' : ''} onClick={handleClick}>
        <div className={[styles.conatinerBtn, border? styles.transprent: black ? styles.black : styles.notBlack, border? styles.border : ' ' ].join(" ")} >
        <span dangerouslySetInnerHTML={{ __html: label }}/>
        </div>
    </button>
   
  )
}
