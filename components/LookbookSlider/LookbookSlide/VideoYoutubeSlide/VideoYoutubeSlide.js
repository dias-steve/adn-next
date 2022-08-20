import React from 'react'
import YoutubeViewerStory from '../../../youtubeViewer/YoutubeViewerStory/YoutubeViewerStory'
import styles from './VideoYoutubeSlide.module.scss'
export default function VideoYoutubeSlide({data}) {
    const {video , description, landscap_format} = data
  return (
    <div className={[styles.slideVideo, 'content-container'].join(" ")}>
         <div className={styles.pictureWrapper}>
        <div className={[styles.imgWrapper,landscap_format ? styles.paysage : styles.portrait ].join(" ")}>       
 
          </div>
            <YoutubeViewerStory video = {{url:video}} landscap={true}/>

          </div>
          <div className={styles.descriptionWrapper}>

          <p className={styles.descriptionShootbook}>{description}</p>
      </div>
    </div>
  )
}
