import React from 'react'
import styles from './BlocImageCercleTitre.module.scss';
export default function BlocImageCercleTitre({data}) {

  return (
    <div className={styles.global}>
      <p>{data.titre}</p>
    </div>
  )
}
