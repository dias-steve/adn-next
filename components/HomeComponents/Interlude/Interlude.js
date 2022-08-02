import React, { useConext, useRef, useEffect, useState } from "react";
import styles from './Interlude.module.scss';

import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Interlude = ({ interludeData }) => {

  const interludeContainerRef = useRef(null);
  const textWrapperRef= useRef(null);
  const homeInterludeRef = useRef(null);
  const textColorRef = useRef(null);
  useEffect(()=> {
    const el = textWrapperRef.current;
    const elInterludeContainerRef  = interludeContainerRef.current;

    gsap.timeline({delay: 0.3})
    .fromTo( el,
    {

    },{        
        duration: 1,

        ease:'power2',
        scrollTrigger:{
            trigger: elInterludeContainerRef ,
            scrub: 1,
            start: "top 80%",
            end: "bottom ",
           
          
        }
 
    })
  },[])


  useEffect(()=> {

    const elInterludeContainerRef  = interludeContainerRef.current;
    const elHomeInterlude = homeInterludeRef.current;
    gsap.timeline({delay: 0.3})
    .to( elHomeInterlude,
      {        
        duration: 1,
        x:500,
        backgroundPositionX: '110%',
     
        scrollTrigger:{
            trigger: elInterludeContainerRef ,
    
            scrub: 1,
            start: "top 80%",
            end: "bottom ",
           
          
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