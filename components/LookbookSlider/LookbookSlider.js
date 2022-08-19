import React from 'react'
import LookbookSlide from './LookbookSlide/LookbookSlide'
import styles from './LookbookSlider.module.scss'
import { v4 as uuidv4 } from "uuid";
export default function LookbookSlider({description, title, media_list}) {
  const media0= media_list[0]

  return (
    <div className={styles.containerSlider}>
      <div className={styles.track}>
      <div className={styles.slideWrapper}>
      <LookbookSlide
        data ={{title, description}}
        type={'intro'}
        />
      </div>
        {media_list.map(media => (
            <div key={uuidv4()} className={styles.slideWrapper}>
              <LookbookSlide
                data ={media}
                type={media.type_media}
              />
            </div>))}
    
          </div>

    </div>
  )
}
