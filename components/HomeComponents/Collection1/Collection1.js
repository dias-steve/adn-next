import React, { useConext, useRef, useEffect, useState } from "react";

import Image from "next/image";



import SplitText from "../../../utils/Split3.min.js";

import styles from './Collection1.module.scss'

import Button from "../../Button";



const Collection1 = ({ collectionData, gsap, widthScreen }) => {

    const { id, title, titre_accueil, short_description, image_1_accueil } =
      collectionData;
      const [show, setshow] = useState(false)
      const collectionRef = useRef();
      const imageRef = useRef(null)
      const btnRef= useRef(null)
      const imageInRef = useRef(null)
            const isMobile = widthScreen <= 770 ? true : false;
  
  
      useEffect(()=>{
        const split = new SplitText("#header-text",{
            type: 'lines', 
            linesClass: styles.lineChildren,
        });
  
        //pour avoir le overline 
        const splitParent = new SplitText("#header-text",{
            type: 'lines', 
            linesClass: styles.lineParent,
        });
  
  
        const splitParagraph = new SplitText("#header-paragraphe",{
          type: 'lines', 
          linesClass: styles.lineChildren,
      });
      const splitParentParagraph = new SplitText("#header-paragraphe",{
        type: 'lines', 
        linesClass: styles.lineParent,
    });

      const elImage = imageRef.current
      const elBtn = btnRef.current
      
      
        // on annime avec gsap
       const tl = gsap.timeline({delay: 0.5})
 

        tl.fromTo(elImage,{
       
        
          ease: "power2",
     
          scale:0.5,
          borderRadius: 50,
          stagger: 0.5,
          maxWidth:0,
  

        },   {
         
          maxWidth:800,
    
          ease: "power2",
          scale:1,
          borderRadius: 50,
    
         
     
      })
        
        .fromTo(split.lines,{
          y:300
        },{
            duration: 1,
            y:0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2",
        },'-=0.5').to(splitParagraph.lines, {
          duration: 1,
          y:0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2",
      },'-=1')
      .fromTo(elBtn,{
        duration: 1,
        maxWidth: 0,
      }, {maxWidth: 300,},'-=0.5')

      setshow(true)
 
    },[]);



  
      useEffect(()=>{
        // si le paragraphe est à l'écran on le montre 
        // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition

        const elImage = imageRef.current
        gsap.fromTo( elImage,
          {
            maxWidth:700,
         
          },{        
              duration: 1,

     
              maxWidth:0,
              scrollTrigger:{
                  trigger: elImage,
                  toggleActions: "restart none reverse none",
              
                  start: "top -30%",
      
                
              }
       
          })        
    },[]);

     
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

  
  
  
    return (
      <div ref={collectionRef} className={`${styles.collection1Global} content-container `}>
        <div className={styles.gridWrapper }>
          <div className={styles.imageWrapper}>
            <div ref= {imageRef }className={styles.imageContainer }>
              <Image src={image_1_accueil.url} alt= {image_1_accueil.alt} layout="fill" className={styles.image} />
            </div>
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
             
  
              <div className={styles.btnWrapper} ref={btnRef}>
                <Button  name="En savoir plus" url={`/collection/${ id}`} />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Collection1