import React from 'react'
import ButtonPrimary from '../../../ButtonPrimary/ButtonPrimary';
import styles from './BlocGraphiqueDescription.module.scss';
import Image from "next/image";

export default function BlocGraphiqueDescription({data}) {
  const {image_principale, description} = data;
  return (
    <div className={styles.global_container}>
    {
        data.image_principale?.url &&
          <div className={styles.wrapper_image}>
            <Image 
              src={data.image_principale.url}
              alt={data.image_principale.alt}
              layout={"fill"}
              objectFit="contain"
              className={styles.image}/>
          </div>
      }
    
    <div className= {styles.description} dangerouslySetInnerHTML={{__html:description}}/>

    <ButtonPrimary 
      label = 'Nous contacter'
      internURL={'/contact'}

    />
    </div>
  )
}
