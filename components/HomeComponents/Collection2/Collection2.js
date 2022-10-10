
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
  
      const isMobile = widthScreen <= 770 ? true : false;
  
      // ref = paragraph
      

  
  
 
  
      //annimation image
 
      useEffect(()=>{
        // si le paragraphe est à l'écran on le montre 
        // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
      if(!isMobile){
      const el = imageRef.current;
      const elCollection = collectionRef.current;
      gsap.timeline({delay: 0})
        .fromTo( el,
        {
          y:-50,
          
  
        },{        
            
        
            y: 50,
            ease:'power2',
            scrollTrigger:{
                trigger: elCollection,
                scrub: 0,
                start: "top 90%",
                end:"buttom -200%",

      
               
              
            }
     
        })
      }
        
    },[]);

    useEffect(()=>{
      // si le paragraphe est à l'écran on le montre 
      // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
    const el = imageRef.current;
      const elCollection = collectionRef.current;
    gsap
      .to( el,{
        delay: 0.7,       
          duration: 1,
          maxWidth: 500,
    
          ease:'power2',
          scrollTrigger:{
              trigger: elCollection,
              start: "top 80%",
              end: isMobile ? "buttom 80%":"buttom 60%",
              toggleActions: "restart none reverse none",
        
    
             
            
          }
   
      })

      
  },[]);

     
   /* useEffect(()=>{
      // si le paragraphe est à l'écran on le montre 
      // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
    
    const elCollection = collectionRef.current;
    gsap
      .to(elCollection,
   {       
          delay: 0.5, 
          duration: 1,
          opacity: 1,

          ease:'power2',
          scrollTrigger:{
              trigger: elCollection,
              toggleActions: "restart none reverse none",
              start: "top center",
              end:"buttom 90%",
         
      
             
            
          }
   
      })

      
  },[]);*/

    useEffect(()=>{
      // si le paragraphe est à l'écran on le montre 
      // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
    const el = btnRef.current
    const elCollection = collectionRef.current;
    
    gsap.
      fromTo( el,
      {maxWidth: 0,
   
      },{    
          delay: 0.5,    
          duration: 1,
          maxWidth: 300,
       
          ease:'power2',
          scrollTrigger:{
              trigger: elCollection,
              toggleActions: "restart none reverse none",
              start: "top center",
              end: isMobile ? "buttom 60%":"buttom 60%",
      

       
          }
   
      })

      
  },[]);

  
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
