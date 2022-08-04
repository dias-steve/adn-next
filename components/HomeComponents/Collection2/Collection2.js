
import React, { useConext, useRef, useEffect, useState } from "react";

import Image from "next/image";

import Button from "../../Button";

import useOnScreen from "../../../hooks/useOnScreen";


import useDeviceDetect,{ getWitdthScreen } from "../../../hooks/useDeviceDectect";
import styles from './Collection2.module.scss';



const Collection2 = ({ collectionData, pageSize, gsap, widthScreen  }) => {
    const { id, title, titre_accueil, short_description, image_1_accueil } =
      collectionData;
  
      const collectionRef = useRef();
      const imageRef = useRef(null);
      const btnRef= useRef(null)
  
      const isMobile = widthScreen <= 570 ? true : false;
  
      // ref = paragraph
      

  
  
 
  
      //annimation image
     if (true){
      useEffect(()=>{
        // si le paragraphe est à l'écran on le montre 
        // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
      const el = imageRef.current;
      const elCollection = collectionRef.current;
      gsap.timeline({delay: 0.3})
        .fromTo( el,
        {maxWidth: 0,
          y:isMobile ?20:-50,
  
        },{        
            duration: 1,
            maxWidth: 1500,
            y:isMobile ?200:200,
            ease:'power2',
            scrollTrigger:{
                trigger: elCollection,
                scrub: 1,
                start: "top 80%",
                end: "Bottom -200% ",
               
              
            }
     
        })

        
    },[]);

    useEffect(()=>{
      // si le paragraphe est à l'écran on le montre 
      // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
    const el = btnRef.current
    
    gsap.timeline({delay: 0.3})
      .fromTo( el,
      {maxWidth: 0,
   
      },{        
          duration: 1,
          maxWidth: 300,
       
          ease:'power2',
          scrollTrigger:{
              trigger: el,
              scrub: 1,
              start: "top 95%",
              end: "bottom 50%",
       
          }
   
      })

      
  },[]);
}
  
    return (
      <div ref={collectionRef}  className={`${styles.homeCollection2Global} content-container`}>
        <div className={styles.gridWrapper}>
          <div className={styles.gridLeftContainer}>
            <div className={styles.imageWrapper}>
              <div ref={imageRef} id='home-collection2-img' className={` ${styles.imageContainer} `}>
                <Image
                  src={image_1_accueil.url}
                  alt={image_1_accueil.alt}
                  layout="fill"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
  
          <h1 id = 'headline'  className={styles.homeCollectionTitle }>
            {titre_accueil}
          </h1>
          <div className={styles.shortDescriptionWrapper}>
            <div >
              <p >
                {short_description}
              </p>
              <div className={styles.btnWrapper} ref={btnRef}>
              <Button idDiv= "home-collection2-button" name="En savoir plus" url={`/collection/${ id}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Collection2;
