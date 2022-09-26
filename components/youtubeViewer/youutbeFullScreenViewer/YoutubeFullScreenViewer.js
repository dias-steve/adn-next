import React, {useEffect, useState} from 'react';
import styles from './YoutubeFullScreenViewer.module.scss'
import YoutubeViewerStory from './../YoutubeViewerStory/YoutubeViewerStory.js'
import ButtonCercle from '../../ButtonCercle/ButtonCercle';
import crossIcon from '../../../public/cross.svg';

export default function YoutubeFullScreenViewer({setShowYoutube, video}) {

    window.document.body.style.overflow = 'hidden';
  

    const setHidden = () => {
        console.log("bloque scroll test");
        console.log(window.document.body.style.overflowY);
        if (window.document.body.style.overflowY !== "hidden") {
            window.document.body.style.overflowY = "hidden";
        } else {
            window.document.body.style.overflowY = "scroll";
        }
        console.log("bloque scroll test after");
        console.log(window.document.body.style.overflowY);
      };
    useEffect(() => {
        setHidden();

    },[])
  return (
    <div className= {styles.globalContainer}>
        <div className = {styles.youtubeStoryWrapper} >
            <YoutubeViewerStory video = {{url: video.id}} landscap={true}  notautoplay={true} />
            <div className = {styles.btnCloseWrapper} >
                <ButtonCercle
                    img= {crossIcon}
                    alt={'close icon'}
                    handleClick={(e) => {e.preventDefault(); setShowYoutube(false)}}
                    black = {true}

                
                />
            </div>
        </div>
    </div>
  )
}
