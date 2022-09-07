import React from 'react';
import styles from './ButtonCercle.module.scss';
import Image from "next/image";

export default function ButtonCercle({img, alt, handleClick, rotate90, toRightReverse, black = false}) {
  return (
    <button className= {[styles.btn, black? styles.btnBlack: styles.btnWhite].join(" ")} type='submit' onClick={(e) => { handleClick(e)}} >
        <div className= {[styles.imageWrapper, rotate90 ? styles.rotate90 : styles.notRotate90, toRightReverse ? styles.toRight : ' '].join(" ")}> <Image alt = {alt} src= {img} layout={'fill'} className={styles.image}/> </div>
    </button >
  )
}
