import React, { useConext, useRef, useEffect, useState } from "react";
import { getWitdthScreen } from "../../../hooks/useDeviceDectect";
import styles from './Interlude.module.scss';






const Interlude = ({ interludeData, gsap,widthScreen  }) => {

  const interludeContainerRef = useRef(null);
  const textWrapperRef= useRef(null);
  const homeInterludeRef = useRef(null);
  const textColorRef = useRef(null);







  useEffect(()=> {

    const elInterludeContainerRef  = interludeContainerRef.current;
    const elHomeInterlude = homeInterludeRef.current;
    const elTextWrapper= textWrapperRef.current;
    gsap.timeline({delay: 0.3})
    .to( elHomeInterlude,
      {        
        duration: 1,
        x: '-120%',
     
     
        scrollTrigger:{
            trigger:  elTextWrapper,
            pin:elInterludeContainerRef,
            scrub: 1,
             start: "center center",
            end: "bottom -1000px",
            markers: true
           
          
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
        
  
           
          
        }
 
    })
  },[])

  useEffect(() => {

  })
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