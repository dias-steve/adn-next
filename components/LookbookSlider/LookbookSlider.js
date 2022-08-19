import React from 'react'
import LookbookSlide from './LookbookSlide/LookbookSlide'
import styles from './LookbookSlider.module.scss'
export default function LookbookSlider({description, title, images}) {
  return (
    <div className={styles.containerSlider}>
        <LookbookSlide
        description={ description}
        title={title}
        isIntro={true}
        />
    </div>
  )
}
