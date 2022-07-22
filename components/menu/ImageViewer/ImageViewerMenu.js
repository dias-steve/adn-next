import React from 'react'
import styles from './ImageViewerMenu.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";



export default function ImageViewerMenu({thumbnail}) {



  return (
    <div style= {styles.globalContainer}>
        {thumbnail && thumbnail.url &&
          <div key={uuidv4()}  className={styles.imageWrapper}>
            <Image src={thumbnail.url} alt={thumbnail.alt} layout={"fill"} className={styles.image}/>
          </div>
        }
    </div>
  )
}
