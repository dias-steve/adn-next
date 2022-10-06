import React from 'react';
import styles from './PopUpToast.module.scss';

export default function PopUpToast ({title, description, PrimaryBtnData, BtnSecondaryBtnData }) {

  return (
    <div className={styles.global_container}>
    
        <h2>{title}</h2>
        <p> {description}</p>

    </div>
  )
}
