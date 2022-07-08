import React from "react";
import styles from "./VideoViewer-component-styles.module.scss";

export default function VideoViewer({ video }) {
  return (
    <div className={styles.containerGlobal}>
      <div className={styles.videoBlock}>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video autoPlay loop muted className={styles.videoViwer}>
              <source
                src={video.url}
                type="video/mp4"
                className={styles.videoViwerSrc}
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
