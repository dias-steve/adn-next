import React from 'react'
import styles from './ButtonPrimary-component-styles.module.scss'
export default function ButtonPrimary({label, handleClick}) {
  return (
    
    <button className={styles.ButtonPrimary}>
        <div className={styles.conatinerBtn} onClick={handleClick}>
        <span>{label}</span>
        </div>
    </button>
   
  )
}
