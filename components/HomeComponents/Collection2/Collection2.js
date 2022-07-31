
import React, { useConext, useRef, useEffect, useState } from "react";

import Image from "next/image";

import Button from "../../Button";

import useOnScreen from "../../../hooks/useOnScreen";

import gsap from 'gsap';

import styles from './Collection2.module.scss';

const Collection2 = ({ collectionData, pageSize }) => {
    const { id, title, titre_accueil, short_description, image_1_accueil } =
      collectionData;
  
      const collectionRef = useRef();
      
  
      const [collectionReveal, setCollectionReveal] = useState(false);
  
      // ref = paragraph
      const onScreen = useOnScreen(collectionRef);
      let annimation = null
      const createAnnimation = () =>{
        annimation = gsap.timeline({delay:0.3})
        .from('#home-collection2-img',
        {
          delay: 0.5,
          duration: 0.5,
          width: 0,
          ease: "power2",
        }).from('#home-collection2-button',
        {
          duration: 0.5,
          borderRadius:100,
          width:0
        }
        )
        console.log('createAnniamtion');
      }
  
  
      useEffect(()=>{
          if(onScreen){
            
            setCollectionReveal(onScreen);
            console.log('onscreen titres')
          }else{
            setCollectionReveal(false);
            console.log('not onscreen titres')
          }
      },[onScreen]);
  
  
      useEffect(()=>{
        // si le paragraphe est à l'écran on le montre 
        // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
        
   
        if(onScreen){
  
          createAnnimation();
          
  
        }
        
        return() => {
          if(annimation){
            annimation.kill()
          }
        }
  
  
    },[onScreen]);
  
    return (
      <div  className={`${styles.homeCollection2Global} content-container`}>
        <div className={styles.gridWrapper}>
          <div className={styles.gridLeftLontainer}>
            <div ref={collectionRef} id='home-collection2-img' className={` ${styles.imageContainer} ${collectionReveal? styles.opacity1:styles.opacity0}`}>
              <Image
                src={image_1_accueil.url}
                alt={image_1_accueil.alt}
                layout="fill"
                className={styles.image}
              />
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
              <Button idDiv= "home-collection2-button" name="En savoir plus" url={`/collection/${ id}`} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Collection2;
