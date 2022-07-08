
import React, { useEffect, useRef } from 'react';
import styles from "./VideoViewer-component-styles.module.scss";

const videogoogle = "https://kstatic.googleusercontent.com/files/c44f15bb7e678d651e18fdee3058f2948aa733849e0dea3daf7429bf0f77ec23bd670dba63e71739d5b53489c98689bdbb80c47cf55f44649d9d1bfdf3e4f0a0";
export default function VideoViewer({ video }) {

  return (
    <div className={styles.containerGlobal}>
      <div className={styles.videoBlock}>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video  src={videogoogle }         playsinline=""
        autoPlay
        webkit-playsinline=""
        loop  className={styles.videoViwer}/>
 

          </div>
        </div>
      </div>
    </div>
  );
}
