import React from 'react'
import styles from './ButtonSecondary-component-styles.module.scss'
export default function ButtonSecondary({label, handleOnClick}) {
  return (
    <div className={styles.containerGlobal}><button onClick={handleOnClick}>{label}</button></div>

  )
}
