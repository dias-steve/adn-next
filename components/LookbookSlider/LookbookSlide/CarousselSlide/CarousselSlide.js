import React from 'react'
import ImageSliderV2 from '../../../ImageSliderV2/ImageSliderV2'
import styles from './CarousselSlide.module.scss'
export default function CarousselSlide({data}) {
    const {image_gallery,description,} = data

  return (

<div className = {[styles.slideImage, styles.slide, 'content-container'].join(" ")}>

<div className={styles.pictureWrapper}>

  <div className={[styles.imgWrapper, styles.portrait ].join(" ")}>       
  <ImageSliderV2 images = {image_gallery}/>
    </div>


    </div>
    <div className={styles.descriptionWrapper}>

    <p className={styles.descriptionShootbook}>{description}</p>
    </div>
      </div>
  )
}
