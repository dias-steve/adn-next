import React from 'react'
import styles from './ImageSlide.module.scss'
import Image from 'next/image';
import ImageSlider from '../../../ImageSlider/ImageSlider';
export default function ImageSlide({data}) {
    const {image, description, landscap_format} = data;
    return(
      <div className = {[styles.slideImage, styles.slide, 'content-container'].join(" ")}>
      <div className={styles.pictureWrapper}>
      <ImageSlider  notViewer= {true} images={[image,image]} />
        <div className={[styles.imgWrapper,landscap_format ? styles.paysage : styles.portrait ].join(" ")}>       
          <Image
                className={styles.image}
                src={image.url}
                layout="fill"
                alt={image.alt}
    
              />
          </div>


          </div>
          <div className={styles.descriptionWrapper}>

          <p className={styles.descriptionShootbook}>{description}</p>
      </div>
      </div>

    )
}
