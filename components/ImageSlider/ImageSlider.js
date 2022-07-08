import React, {useState} from 'react';
import Image from "next/image";
import {v4 as uuidv4} from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import blurImg from '../../public/imageblur.jpg'
import chevronRight from '../../public/chevron-right.svg'
import chevronLeft from '../../public/chevron-left.svg'
//styles
import styles from './ImageSlider-component-styles.module.scss';
import BtnNextPrev from '../BtnNextPrev/BtnNextPrev.js'






const mapState = (state) => ({
    images: state.product.product_gallery_images,
  });
export default function ImageSlider() {
    const { images } = useSelector(mapState);
    const [currentImageIndex, setcurrentImageIndex] = useState(0)

    return (
        <div className={styles.containerGlobal}>
        <div className={styles.windowSlider}>
            
            <div className={[styles.btnNextPrev,styles.btnNextLeft].join(" ")}>
            <BtnNextPrev
            isLeft={true}
            handleOnClick={() => {}}
            />

            </div>
            <div className={[styles.btnNextPrev,styles.btnNextRight].join(" ")}>
            <BtnNextPrev
            isLeft={false}
            handleOnClick={() => {}}
            />
            </div>
  


            
            <div className={styles.imageWrapper}>
                <Image src={images[0].url? images[0].url : blurImg} alt= {images ? images[0].alt : 'bruit'} layout="fill" className={styles.image} />
            </div>

        </div>
        </div>  
    )
}
