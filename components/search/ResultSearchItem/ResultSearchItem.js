
import React from 'react'
import styles from './ResultSearchItem.module.scss';
import Image from 'next/image'

export default function ResultSearchItem({thumnail, title, isPortrait}) {
  return (
    <div className={[styles.resultItemContainer, isPortrait ? styles.containerPortrait : styles.containerNotPortrait].join(" ")}>
        <div className={styles.imageWrapper}>
            <Image src={thumnail.url} alt={thumnail.alt} layout={"fill"} className={styles.image}/>
        </div>

        <div className={styles.titleWrapper}>
            <p>{title}</p>
        </div>
    </div>
  )
}
