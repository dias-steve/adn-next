import React from 'react'
import styles from './ShootbookCarrousel.module.scss'
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";



export default function ShootbookCarrousel({images}) {

  return (
    <div  className={styles.section} >
     
    <div  className={styles.wrapper }>
    <div className={styles.trackImages}>
    {images.map(image => (
      <div key= {uuidv4()} className={styles.imageWrapper}>
      <Image src={image.url} alt={image.alt} layout="fill" className={styles.image} />
      </div> 
    ))} 
    </div>
    </div>
    </div>
  )
}
