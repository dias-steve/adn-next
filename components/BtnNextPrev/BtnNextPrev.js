import React from 'react'
import Image from "next/image";

import styles from './BtnNextPrev-component-styles.module.scss'

import chevronRight from '../../public/chevron-right-white.svg'
import chevronLeft from '../../public/chevron-left-white.svg'


export default function BtnNextPrev ({isLeft = false, handleOnClick}){
    return (
        <div className= { [styles.btnNextPrev, isLeft ? styles.left : styles.right ].join(" ")} onClick={(e)=> {handleOnClick(e)}}>
            <div className={styles.imageBtnWrapper}>
                <Image src={ isLeft ? chevronLeft : chevronRight } alt= { isLeft ? 'chevron go to left' : 'Chevron go to right' } layout="fill" className={styles.image} />
            </div>

        </div>
    )

} 
