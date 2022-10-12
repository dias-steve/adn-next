
import React from 'react'
import styles from './ResultSearchItem.module.scss';
import Image from 'next/image'
import Link from "next/link";

export default function ResultSearchItem({thumnail, title, isPortrait, link}) {
  return (
    <>
    {
      link ?
    
    <Link href={link} >
    <a>
    
    <div className={[styles.resultItemContainer, isPortrait ? styles.containerPortrait : styles.containerNotPortrait].join(" ")}>
  

        {thumnail && thumnail.url &&
          <div className={styles.imageWrapper}>
            <Image src={thumnail.url} alt={thumnail.alt} layout={"fill"} className={styles.image}/>
          </div>
        }


        <div className={styles.titleWrapper}>
            <p dangerouslySetInnerHTML={{__html: title}}/>
        </div>
    
    </div>
    </a>
    </Link> :
        <div className={[styles.resultItemContainer, isPortrait ? styles.containerPortrait : styles.containerNotPortrait].join(" ")}>
  

      {thumnail.url &&
        <div className={styles.imageWrapper}>
            <Image src={thumnail.url} alt={thumnail.alt} layout={"fill"} className={styles.image}/>
        </div>
      }
        <div className={styles.titleWrapper}>
        <p dangerouslySetInnerHTML={{__html: title}}/>
        </div>
    
    </div>
    }

    </>
  )
}
