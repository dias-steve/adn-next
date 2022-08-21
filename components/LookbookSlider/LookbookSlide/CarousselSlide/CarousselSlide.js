import React from 'react'
import ImageSliderV2 from '../../../ImageSliderV2/ImageSliderV2'
import styles from './CarousselSlide.module.scss'
export default function CarousselSlide({data}) {
    const {image_gallery} = data

  return (
      <div className = {[ styles.slide, "content-container"].join(" ")}>
      
        <ImageSliderV2 images = {image_gallery}/>
   

        </div>
  )
}
