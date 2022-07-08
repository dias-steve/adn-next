
import { is } from '@react-spring/shared';
import React, { useEffect, useRef, useState } from 'react';
import styles from "./VideoViewer-component-styles.module.scss";
const PLAYING_DEBOUNCE_TIME = 50;
const WAITING_DEBOUNCE_TIME = 200;
const videogoogle = "https://kstatic.googleusercontent.com/files/c44f15bb7e678d651e18fdee3058f2948aa733849e0dea3daf7429bf0f77ec23bd670dba63e71739d5b53489c98689bdbb80c47cf55f44649d9d1bfdf3e4f0a0";
const videoshop = "https://storage.googleapis.com/bucket-d-te/pexels-cottonbro-7760272.mp4"
export default function VideoViewer({ video }) {
  const [isLoading, setIsLoading] = useState(true)

 
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
  
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
  
      const element = videoElementRef.current;
  
      element.addEventListener("waiting", waitingHandler);
      element.addEventListener("play", playHandler);
      element.addEventListener("playing", playHandler);
      element.addEventListener("pause", pauseHandler);
  
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
      {isPlaying && 'playing'}
      {isWaiting && 'waiting'}
    
      <div className={styles.videoBlock}>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video ref={videoElementRef} src={videoshop }         playsinline=""
        autoPlay
        preload={'auto'}
        webkit-playsinline=""
        loop  className={styles.videoViwer}
        
        />
 

          </div>
        </div>
      </div>
    </div>
  );
}
