import React, { useConext, useRef, useEffect, useState } from "react";
import styles from './Interlude.module.scss';
const Interlude = ({ interludeData }) => {
    return (
      <div className={styles.InterludeGlobal}>
        <div className={styles.interludeTextWrapper}>
          <div className={styles.textColorZone} />
          <h2 className={styles.homeInterlude }>{interludeData}</h2>
        </div>
      </div>
    );
  };

export default Interlude;