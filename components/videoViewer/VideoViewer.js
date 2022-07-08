
import React, { useEffect, useRef } from 'react';
import styles from "./VideoViewer-component-styles.module.scss";

export default function VideoViewer({ video }) {

  return (
    <div className={styles.containerGlobal}>
      <div className={styles.videoBlock}>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video  src={video.url}         playsinline=""
        autoPlay
        webkit-playsinline=""
        loop  className={styles.videoViwer}/>
 

          </div>
        </div>
      </div>
    </div>
  );
}
