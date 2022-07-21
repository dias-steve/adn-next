import React from 'react';
import styles from './ButtonCercle.module.scss';
import Image from "next/image";

export default function ButtonCercle({img, alt, handleClick, rotate90}) {
  return (
    <button className= {styles.btn} type='submit' onClick={(e) => { handleClick(e)}} style={{ backgroundColor: false? 'black': ' #D9D9D9' }}>
        <div className= {[styles.imageWrapper, rotate90 ? styles.rotate90 : styles.notRotate90 ].join(" ")}> <Image alt = {alt} src= {img} layout={'fill'} className={styles.image}/> </div>
    </button >
  )
}
