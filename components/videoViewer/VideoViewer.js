
import { is } from '@react-spring/shared';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import styles from "./VideoViewer-component-styles.module.scss";
import iconPlay from "../../public/play-fill-green.svg"
const PLAYING_DEBOUNCE_TIME = 50;
const WAITING_DEBOUNCE_TIME = 200;
const videogoogle = "https://kstatic.googleusercontent.com/files/c44f15bb7e678d651e18fdee3058f2948aa733849e0dea3daf7429bf0f77ec23bd670dba63e71739d5b53489c98689bdbb80c47cf55f44649d9d1bfdf3e4f0a0";

export const BtnPlay = ({onClick}) => {
  return (
    <div onClick={() => onClick()} className={styles.btnPlayContainer}>

      <div className={styles.imageBtnWrapper}>
                <Image src={ iconPlay } alt= { 'icon Play video' } layout="fill" className={styles.image} />
            </div>
    </div>
  )
}

export const SpinWaiting = () => {
  return(
  <div className={styles.btnPlayContainer}>
        <div className={styles.wrapperSpinner}>
          <div className={styles.spin}></div>
      </div>
  </div>
  )
}
export default function VideoViewer({ video2 }) {

    const video = {url: videogoogle, atl: 'tt'}
 
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [loaded, setLoaded] = useState(false);
  
    const isWaitingTimeout = useRef(null);
    const isPlayingTimeout = useRef(null);
  
    const videoElementRef = useRef();
  
    useEffect(() => {
      if (!videoElementRef.current) {
        return;
      }
  
      const waitingHandler = () => {
        clearTimeout(isWaitingTimeout.current);
  
        isWaitingTimeout.current = setTimeout(() => {
          setIsWaiting(true);
        }, WAITING_DEBOUNCE_TIME);
      };
  
      const playHandler = () => {
        clearTimeout(isWaitingTimeout.current);
        clearTimeout(isPlayingTimeout.current);
  
        isPlayingTimeout.current = setTimeout(() => {
          setIsPlaying(true);
          setIsWaiting(false);
        }, PLAYING_DEBOUNCE_TIME);
      };
  
      const pauseHandler = () => {
        clearTimeout(isWaitingTimeout.current);
        clearTimeout(isPlayingTimeout.current);
  
        isPlayingTimeout.current = setTimeout(() => {
          setIsPlaying(false);
          setIsWaiting(false);
        }, PLAYING_DEBOUNCE_TIME);
      };
  
      const loadeddataHandle = () => {
        setLoaded(true)
      }
      const element = videoElementRef.current;
  
      element.addEventListener("waiting", waitingHandler);
      element.addEventListener("play", playHandler);
      element.addEventListener("playing", playHandler);
      element.addEventListener("pause", pauseHandler);
      element.addEventListener("loadeddata", loadeddataHandle);
  
      // clean up
      return () => {
        clearTimeout(isWaitingTimeout.current);
        clearTimeout(isPlayingTimeout.current);
  
        element.removeEventListener("waiting", waitingHandler);
        element.removeEventListener("play", playHandler);
        element.removeEventListener("playing", playHandler);
        element.removeEventListener("pause", pauseHandler);
      };
    }, [videoElementRef]);
  
    
    const handlePlayPauseClick = () => {
      if (videoElementRef.current) {
        if (isPlaying) {
          videoElementRef.current.pause();
        } else {
          videoElementRef.current.play();
        }
      }
    };
  
 
  return (
    <div className={styles.containerGlobal}>

      {!isPlaying && loaded && <BtnPlay onClick = {() => {handlePlayPauseClick()}}/>}
      { isWaiting &&
        <SpinWaiting/>
      }

      {!loaded &&
        <SpinWaiting/>
      }
      <div className={styles.videoBlock}>
     
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video  onClick = {() => {handlePlayPauseClick()}}ref={videoElementRef}      
        muted
        loop  className={styles.videoViwer}
        
        >
          <source  src={video.url}  type="video/mp4" ></source>
          
          </video>
 

          </div>
        </div>
      </div>


    </div>
  );
}
