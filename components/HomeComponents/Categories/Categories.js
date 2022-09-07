import React, { useConext, useRef, useEffect, useState } from "react";
import styles from "./Categorie.module.scss";
import Image from "next/image";
import YoutubeFullScreenViewer from "../../youtubeViewer/youutbeFullScreenViewer/YoutubeFullScreenViewer";

const Categories = ({ imageCollectionUrl, imageShootbookUrl, gsap }) => {

  const refImageCat1 = useRef(null);

  const refImageCat2 = useRef(null);
  const refSection = useRef(null);
  const [showYoutube, setShowYoutube] = useState(true); 

  useEffect(()=>{
    // si le paragraphe est à l'écran on le montre 
    // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
  const el =  refImageCat2.current;
  const elrefSection = refSection.current;
  gsap.timeline({delay: 0.3})
    .fromTo( el,{y: -20},
{        
     
  duration: 1,
        y:20,
   
        scrollTrigger:{
            trigger: elrefSection,
            scrub: 0,
            start: "top 90%",
            end: "bottom -50%",
         
           
           
          
        }
 
    })

    
},[]);

useEffect(()=>{
  // si le paragraphe est à l'écran on le montre 
  // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
const el =  refImageCat1.current;
const elrefSection = refSection.current;
gsap.timeline({delay: 0.3})
  .fromTo( el,{y: -20},
{        
   
duration: 1,
      y:20,
 
      scrollTrigger:{
          trigger: elrefSection,
          scrub: 0,
          start: "top 90%",
          end: "bottom -50%",
       
         
         
        
      }

  })

  
},[]);
    return (
      <div ref={refSection} className={styles.homeCategories}>
                 {showYoutube &&
          <YoutubeFullScreenViewer
              setShowYoutube = {(show) => {setShowYoutube(show)}}

          />
          }
        <div className={[styles.subContainer ].join(" ")}>
 
          <h1 className={styles.title}>À propos</h1>
          <div  className={styles.imageWrapper}>
          <div ref={refImageCat1} className={styles.imageContainer }>
            <Image src={imageCollectionUrl.url} alt={imageCollectionUrl.alt} layout="fill" className={styles.image} quality="100"/>
          </div>
          </div>
        </div>
        <div 
          className={styles.subContainer}
          onClick = {(e) => {e.preventDefault(); setShowYoutube(true);}}
        
        >
          
          <h1 className={styles.title}>Play</h1>
          <div  className={styles.imageWrapper}>

        
          <div  ref={refImageCat2} className={styles.imageContainer }>
            <Image src={imageShootbookUrl.url} alt={imageShootbookUrl.alt} layout="fill" className={styles.image} quality="100"  />
          </div>
          </div>
        </div>
      </div>
    );
  };

export default Categories;