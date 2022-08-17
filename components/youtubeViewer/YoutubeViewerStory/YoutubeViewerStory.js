import React from 'react'
import styles from './YoutubeViewerStory.module.scss'
export default function YoutubeViewerStory({video}) {
  const url = video.url

  return (
    <div className={styles.containerGlobal}>
      <div className={styles.windowsvideo}>
      <iframe className ={styles.youtubeViewerFrame}src={'https://www.youtube.com/embed/'+url+'?autoplay=1&loop=1&rel=0&showinfo=0'}


        muted     
        title='video'
      />
      </div>
     
</div>
  )
}
