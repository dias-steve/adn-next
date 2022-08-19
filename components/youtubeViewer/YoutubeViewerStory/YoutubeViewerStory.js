import React from 'react'
import styles from './YoutubeViewerStory.module.scss'

export default function YoutubeViewerStory({video}) {
  const url = video.url

  const opts = {

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      loop: 1,
    },
  };

  return (
    <div className={styles.containerGlobal}>
      <div className={styles.windowsvideo}>
      <iframe className ={styles.youtubeViewerFrame}
      src={'https://www.youtube.com/embed/'+url+'?autoplay=1&loop=1&rel=0&showinfo=0'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       id="widget10" data-gtm-yt-inspected-2="true" 


        muted     
        title='video'
  />

{/*<YouTube
  videoId={url}
  iframeClassName ={styles.youtubeViewerFrame}
  className={styles.youtubeModule}
  opts={opts}
/>*/}


      </div>
     
</div>
  )
}
