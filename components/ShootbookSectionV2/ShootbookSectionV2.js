import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import { useTheme } from "../../lib/ThemeContext";
import useOnScreen from "../../hooks/useOnScreen";
import styles from "./ShootbookV2.module.scss";
import { v4 as uuidv4 } from "uuid";
import { createImageTableCaroussel } from "../../utils/lookbook.utils";



export default function ShootbookSection({ shootbookData, bodyRef, gsap, widthScreen }) {
  const { themeBlack, setThemeblack } = useTheme();
  const refSection = useRef(null);
  const [reveal, setReveal] = useState(false);
  const isMobile = widthScreen <= 770 ? true : false;
  

  const imageWrapperRef = useRef(null);
  const {
    id,
    title,
    decription_shootbook,
    images,
    video,
    media_list,
    images_apercu
  } = shootbookData;




 

  const imageV3 = createImageTableCaroussel(images_apercu)

  console.log(imageV3)
  const onScreen = useOnScreen( refSection);
  useEffect(() => {
    if (onScreen) {
      setReveal(onScreen);
      console.log("onscreen");
    } else {
      setReveal(onScreen);
      console.log("not on screen");
    }
  }, [onScreen]);

  useEffect(() => {
    // si le paragraphe est à l'écran on le montre
    // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
    if (reveal) {
      setThemeblack(false);
      console.log("is-reveal");
    } else {
      setThemeblack(true);
    }
  }, [reveal]);

    
  useEffect(()=>{
    // si le paragraphe est à l'écran on le montre 
    // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
  if(!isMobile){
  const el =  imageWrapperRef.current;
  const elrefSection = refSection.current;
  gsap.timeline({delay: 0})
    .fromTo( el,{y: -50},
{        
     
  duration: 1,
        y:50,
   
        scrollTrigger:{
            trigger: elrefSection,
            scrub: 0,
            start: "top 90%",
            end: "bottom -50%",
         
           
           
          
        }
 
    })
  }
    
},[]);

useEffect(() => {


},[])
  return (
  
    <div ref={refSection} className={styles.section} >
     
          <div ref={imageWrapperRef} className={styles.wrapper }>
          <div className={styles.trackImages}>
          {imageV3 .map(image => (
            <div key= {uuidv4()} className={styles.imageWrapper}>
            <Image src={image.url} alt={image.alt} layout="fill" className={styles.image} />
            </div> 
          ))} 



          
          </div>
          </div>
                    <div className={styles.testWrapper}>
            <h1 className={styles.titleHomeShootbook}>{title}</h1>
            <p >{decription_shootbook}</p>
            <ButtonPrimary black = {true} border ={true} label="Voir le Lookbook" internURL={'/lookbook/'+id} />
          </div>
        </div>


  );
}
