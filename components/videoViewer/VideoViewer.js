
import React, { useEffect, useRef } from 'react';
import styles from "./VideoViewer-component-styles.module.scss";

export default function VideoViewer({ video }) {
    const videoRef = useRef();

    useEffect(() => {
        setTimeout(()=>{
            videoRef.current.play()
        },5000)
    }, []);
  return (
    <div className={styles.containerGlobal}>
      <div className={styles.videoBlock}>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video ref={videoRef} src={video.url}  className={styles.videoViwer}/>
 

          </div>
        </div>
      </div>
    </div>
  );
}
