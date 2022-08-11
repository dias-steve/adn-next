import React from 'react'
import styles from './Preloader.module.scss'
import { useEffect, useState } from 'react'
import Spinner from '../spin/spinner';
import { useRouter } from 'next/router'
export function Preloader() {
    const router = useRouter()
  
    const [loading, setLoading] = useState(false);
    const [ goUp, setGoUp] = useState(true);
    
    
    useEffect(() => {
        setTimeout(() =>{setLoading(false)},500)
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => {
            
            if(url === router.asPath){
            setTimeout(() =>{setLoading(false)},500)
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
    
    return loading && (<div className={styles.globale}>
      <Spinner blackCircle= {true}/> {router.asPath}</div>)
  }

export default Preloader;