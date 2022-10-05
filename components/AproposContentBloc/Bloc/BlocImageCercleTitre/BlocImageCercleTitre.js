import React from 'react'
import styles from './BlocImageCercleTitre.module.scss';
import Image from "next/image";
export default function BlocImageCercleTitre({data}) {
  console.log(data);
  return (
    <div className={styles.global}>
      <h1 className={styles.title}>{data.titre}</h1>
      <h2 className={styles.second_title}>{data.second_title}</h2>
      <div className= {styles.description} dangerouslySetInnerHTML={{__html:data.description}}/>
      {
        data.image_principale?.url &&
          <div className={styles.wrapper_image}>
            <Image src={data.image_principale.url} alt={data.image_principale.alt} layout={"fill"} className={styles.image}/>
          </div>
      }
    </div>
  )
}
