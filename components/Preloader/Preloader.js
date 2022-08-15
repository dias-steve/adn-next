import React from 'react'
import styles from './Preloader.module.scss'
import { useEffect, useState } from 'react'
import Spinner from '../spin/spinner';
import { useRouter } from 'next/router';


export function Preloader() {
    const router = useRouter()
  
    const [loading, setLoading] = useState(false);
    const [ goUp, setGoUp] = useState(true);
    const [show, setShow] = useState(false);
    const [widthLoader, setWidthLoader] = useState(0);

    const closePreloader =  () =>  {
     setWidthLoader(100)
      setLoading(false)
        setTimeout(() =>{setShow(false)}, 500)
        setTimeout(() =>{setWidthLoader(0)}, 500)
    }
    const openPreloader = () => {
       
        setShow(true);  
 
        setTimeout(() =>{setLoading(true)}, 100);
        setTimeout(() =>{setWidthLoader(100)}, 500)
    }
    
    
    useEffect(() => {
  
        setTimeout(() =>{ closePreloader()}, 1000)
        setShow(true);  
        
        const handleStart = (url) => {if (url !== router.asPath) {  openPreloader()   }}
        const handleComplete = (url) => {
      
        if(url === router.asPath){

            
        } }
    
 
    

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError',  handleComplete)
  
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router.asPath])


    
    return show && (<div className={[styles.globale, !loading ? styles.quit : styles.notQuit ].join(" ")}>
     <p> UNADN </p> 

     </div>)
  }

export default Preloader;