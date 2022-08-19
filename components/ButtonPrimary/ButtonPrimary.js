import React from 'react'
import styles from './ButtonPrimary-component-styles.module.scss'
import Link from "next/link";
export default function ButtonPrimary({label, handleClick, black = false, border, isSubmit, internURL}) {
  
  return (
    <>
    {
      internURL ? 
      <Link href={internURL}>
      <a>
      <button className={styles.ButtonPrimary}>
      <div className={[styles.conatinerBtn, border? styles.transprent: black ? styles.black : styles.notBlack, border? styles.border : ' ' ].join(" ")} >
      <span dangerouslySetInnerHTML={{ __html: label }}/>
      </div>
      </button>
      </a>
      </Link>

      :
      
      <button className={styles.ButtonPrimary} type={isSubmit ? 'submit' : ''} onClick={handleClick}>
      <div className={[styles.conatinerBtn, border? styles.transprent: black ? styles.black : styles.notBlack, border? styles.border : ' ' ].join(" ")} >
      <span dangerouslySetInnerHTML={{ __html: label }}/>
      </div>
  </button>
    }
</>
   
  )
}
