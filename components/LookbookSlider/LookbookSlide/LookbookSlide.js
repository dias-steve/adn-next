import React from 'react'
import styles from './LookbookSlide.module.scss'
import Image from 'next/image';
import arrow from "../../../public/arrowgreen.svg"


export default function LookbookSlide({ data, type}) {

    const IntroSlide = () => {
      const {title, description} = data;
        return(
          <div className = {[styles.slideIntro, styles.slide, 'content-container'].join(" ")}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.arrowWrapper}>
            <div className={styles.imgWrapper}>       
              <Image
                    className={styles.arrow}
                    src={arrow}
                    layout="fill"
                    alt='logo'
                    objectFit="contain"
                  />
              </div>
              <p className={styles.descriptionShootbook}>{description}</p>
  
              </div>
   
          </div>
        )
      }
    
      const ImageSlide = () => {
        const {image, description, } = data;
          return(
            <div className = {[styles.slideImage, styles.slide, 'content-container'].join(" ")}>
            <div className={styles.pictureWrapper}>
              <div className={styles.imgWrapper}>       
                <Image
                      className={styles.image}
                      src={image.url}
                      layout="fill"
                      alt={image.alt}
          
                    />
                </div>
                <p className={styles.descriptionShootbook}>{description}</p>

                </div>
            </div>
          )
        }

     switch(type){
      case 'intro':
        return  <IntroSlide /> 
      case 'image':
        return  <ImageSlide /> 
     
     default:
      return <p>Null</p>
     }

}
