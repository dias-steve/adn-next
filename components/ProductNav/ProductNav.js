import Link from 'next/link'
import React from 'react'
import styles from './ProductNav.module.scss'


const Btn = ({title, link}) => {
  return (    
    <div className= {styles.btn}>
        <Link href={link}>
        <a className={styles.title}>{title}</a>
        </Link>
    </div>
)

}

export default function ProductNav() {
  return (
    <div className= {styles.globale}>
      <Btn title={'Accueil'} link={'/'}/>
      <Btn title={'Voir le lookbook'} link={'/'}/>
      <Btn title={'Voir la seconde collection'} link={'/'}/>
    </div>
  )
}
