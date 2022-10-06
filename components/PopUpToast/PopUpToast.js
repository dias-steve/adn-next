import React from 'react';
import styles from './PopUpToast.module.scss';

export default PopUpToast = ({title, description, PrimaryBtnData, BtnSecondaryBtnData }) => {

  return (
    <div className={styles.global_container}>
    
        <h2>{title}</h2>
        <p> {description}</p>

    </div>
  )
}
