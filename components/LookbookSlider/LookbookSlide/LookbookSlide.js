import React from 'react'
import styles from './LookbookSlide.module.scss'
import Image from 'next/image';
import arrow from "../../../public/arrowgreen.svg"
import ImageSlide from './ImageSlide/ImageSlide';
import GraphiqueSlide from './GraphiqueSlide/GraphiqueSlide';
import VideoYoutubeSlide from './VideoYoutubeSlide/VideoYoutubeSlide';


export default function LookbookSlide({ data, type}) {

    const IntroSlide = () => {
      const {title, description} = data;
        return(
          <div className = {[styles.slideIntro, styles.slide, 'content-container'].join(" ")}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.arrowWrapper}>
   
              <p className={styles.descriptionShootbook}>{description}</p>
  
              </div>
   
          </div>
        )
      }

    const TitreSlide = ({data}) => {
      const {titre} = data;
        return(
          <div className = {[styles.TitreSlide, styles.slide, 'content-container'].join(" ")}>
          <h2 className={styles.title}>{titre}</h2>
      
   
          </div>
        )
      }

      const TextSlide = ({data}) => {
        const {description} = data;
          return(
            <div className = {[styles.TextSlide, styles.slide, 'content-container'].join(" ")}>
            <p className={styles.text}>{description}</p>
        
     
            </div>
          )
        }
    




     switch(type){
      case 'intro':
        return  <IntroSlide data={data} /> 
      case 'image':
        return  <ImageSlide data={data}/> 
      case 'graphique':
          return  <GraphiqueSlide data={data}/> 
      case 'video':
        return <VideoYoutubeSlide data={data}/>
      case 'titre':
            return <TitreSlide data={data}/>
      case 'texte':
        return <TextSlide data={data}/>
     default:
      return <p>Null</p>
     }

}
