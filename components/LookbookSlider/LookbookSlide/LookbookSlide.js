import React from 'react'
import styles from './LookbookSlide.module.scss'
import Image from 'next/image';
import arrow from "../../../public/arrowgreen.svg"
export default function LookbookSlide({description, title, image, isIntro}) {
    const IntroSlide = () => {
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
  return (
    <>
    {
        isIntro ?  
        <IntroSlide /> :    <div>LookbookSlide</div>
    }
    </>
  )
}
