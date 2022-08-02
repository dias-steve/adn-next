import React from 'react'
import styles from './ButtonPrimary-component-styles.module.scss'
export default function ButtonPrimary({label, handleClick, black = false, border}) {
  
  return (
    
    <button className={styles.ButtonPrimary}>
        <div className={[styles.conatinerBtn, black ? styles.black : styles.notBlack, border? styles.border : ' ' ].join(" ")} onClick={handleClick}>
        <span dangerouslySetInnerHTML={{ __html: label }}/>
        </div>
    </button>
   
  )
}
