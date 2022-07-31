
import React, { useConext, useRef, useEffect, useState } from "react";

import Image from "next/image";

import Button from "../../Button";

import useOnScreen from "../../../hooks/useOnScreen";



import styles from './Collection2.module.scss';
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Collection2 = ({ collectionData, pageSize }) => {
    const { id, title, titre_accueil, short_description, image_1_accueil } =
      collectionData;
  
      const collectionRef = useRef();
      const imageRef = useRef(null);
  
      const [collectionReveal, setCollectionReveal] = useState(false);
  
      // ref = paragraph
      const onScreen = useOnScreen(collectionRef);

  
  
 
  
      //annimation image
  
      useEffect(()=>{
        // si le paragraphe est à l'écran on le montre 
        // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
      const el = imageRef.current;
     
        gsap.fromTo( el,
        {maxWidth: 0,
        },{        
            duration: 0.5,
            maxWidth: 1000,
            scrollTrigger:{
                trigger: el,
                scrub: 1,
                start: "top center",
                end: "bottom center",
                //markers: true
            }
     
        })
        
    },[]);
  
    return (
      <div ref={collectionRef}  className={`${styles.homeCollection2Global} content-container`}>
        <div className={styles.gridWrapper}>
          <div className={styles.gridLeftLontainer}>
            <div ref={imageRef} id='home-collection2-img' className={` ${styles.imageContainer} `}>
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
