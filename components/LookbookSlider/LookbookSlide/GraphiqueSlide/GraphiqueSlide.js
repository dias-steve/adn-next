import React from 'react'
import styles from './GraphiqueSlide.module.scss'
import Image from 'next/image';
export default function GraphiqueSlide({data}) {
    const {image, landscap_format} = data;
    return(
      <div className = {[styles.slideGraphique, styles.slide, 'content-container'].join(" ")}>
      <div className={styles.pictureWrapper}>
        <div className={[styles.imgWrapper,landscap_format ? styles.paysage : styles.portrait ].join(" ")}>       
          <Image
                className={styles.image}
                src={image.url}
                layout="fill"
                alt={image.alt}
                objectFit="contain"
    
              />
          </div>


          </div>

      </div>

    )
}
