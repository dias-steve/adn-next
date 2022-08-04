import React, { useConext, useRef, useEffect, useState } from "react";
import { getWitdthScreen } from "../../../hooks/useDeviceDectect";
import styles from './Interlude.module.scss';






const Interlude = ({ interludeData, gsap,widthScreen  }) => {

  const interludeContainerRef = useRef(null);
  const textWrapperRef= useRef(null);
  const homeInterludeRef = useRef(null);
  const textColorRef = useRef(null);


  const isMin565Screen = widthScreen < 565 ? true : false;





  useEffect(()=> {

    const elInterludeContainerRef  = interludeContainerRef.current;
    const elHomeInterlude = homeInterludeRef.current;
    gsap.timeline({delay: 0.3})
    .to( elHomeInterlude,
      {        
        duration: 1,
        x: !isMin565Screen ? 500 :0,
        backgroundPositionX: '100%',
     
        scrollTrigger:{
            trigger: elInterludeContainerRef ,
    
            scrub: 1,
            start: "top 80%",
            end:  !isMin565Screen ?"bottom -50%":"bottom ",
   
           
          
        }
 
    })
  },[])
  useEffect(()=> {

    const eltextColorRef  = textColorRef.current;

    const elInterludeContainerRef  = interludeContainerRef.current;
    gsap.timeline({delay: 0.3})
    .fromTo( eltextColorRef ,      {        
      duration: 1,
  
      scale:0

  },
      {        
        duration: 1,
      
        scale:1,
        scrollTrigger:{
            trigger: elInterludeContainerRef ,

            scrub: 1,
            start: "top 80%",
            end: "bottom ",
            end: isMin565Screen ? "bottom center" :"bottom ",
  
           
          
        }
 
    })
  },[])
    return (
      <div ref={interludeContainerRef} className={styles.InterludeGlobal}>
        <div ref={textWrapperRef} className={styles.interludeTextWrapper}>
          <div ref={textColorRef}className={styles.textColorZone} />
          <h2 ref= {homeInterludeRef}className={styles.homeInterlude }>{interludeData}</h2>
        </div>
      </div>
    );
  };

export default Interlude;