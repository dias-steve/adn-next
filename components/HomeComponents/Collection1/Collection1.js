import React, { useConext, useRef, useEffect, useState } from "react";

import Image from "next/image";



import SplitText from "../../../utils/Split3.min.js";
import gsap from 'gsap';
import styles from './Collection1.module.scss'

import Button from "../../Button";
const Collection1 = ({ collectionData }) => {

    const { id, title, titre_accueil, short_description, image_1_accueil } =
      collectionData;
      const [show, setshow] = useState(false)
  
  
      useEffect(()=>{
        const split = new SplitText("#header-text",{
            type: 'lines', 
            linesClass: "lineChildren",
        });
  
        //pour avoir le overline 
        const splitParent = new SplitText("#header-text",{
            type: 'lines', 
            linesClass: "lineParent",
        });
  
  
        const splitParagraph = new SplitText("#header-paragraphe",{
          type: 'lines', 
          linesClass: "lineChildren",
      });
      const splitParentParagraph = new SplitText("#header-paragraphe",{
        type: 'lines', 
        linesClass: "lineParent",
    });
  
      
      
        // on annime avec gsap
        gsap.timeline({delay: 0.3}).to(split.lines, {
            duration: 1,
            y:0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2",
        }).to(splitParagraph.lines, {
          duration: 1,
          y:0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2",
      })
      setshow(true)
    },[]);
  
  
  
    return (
      <div className={`${styles.collection1Global} content-container `}>
        <div className={styles.gridWrapper }>
          <div className={styles.imageContainer }>
            <Image src={image_1_accueil.url} alt= {image_1_accueil.alt} layout="fill" className={styles.image} />
          </div>
  
          <h1 id='header-text' className={styles.homeCollectionTitle}>
            {titre_accueil}
          </h1>
          <div className={styles.shortDescriptionWrapper}>
            <div>
            
                    <p id= 'header-paragraphe' className=
                    {styles.HomeCollectionShortDescription}>
                    {short_description}
                    </p>
             
  
              <Button name="En savoir plus" url={`/collection/${ id}`} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Collection1