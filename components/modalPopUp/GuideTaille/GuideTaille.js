import React from 'react'
import { useState } from 'react'
import styles from './GuideTaille.module.scss'
import Image from "next/image"

const SelectorContent = ({code, data}) => {


    return(
        <div className={styles.content}>
            {code==1 && <>
                <div className={styles.instructionContainer}>
                <p className={styles.instruction}> {data.message_mesure} </p>
                </div>
                {data.image_illustration.url &&
                <div className={styles.imageZone} >
                <div className={styles.imageWrapper}>

                    <Image src={data.image_illustration.url} layout={'fill'} height={'40vw'}width={'40vw'} objectFit='contain' className={styles.image}  alt={data.image_illustration.alt}/>
                </div>
                </div>
                }
            </>}

            {code== 2 && <>
                <div className={styles.instructionContainer}>
                <p className={styles.instruction}> </p>
                </div>
                {data.image_tab.url &&
                <div className={styles.imageZone} >
                <div className={styles.imageWrapper}>

                    <Image src={data.image_tab.url} height={'100vh'}width={'100vw'} layout={'fill'} objectFit='contain' className={styles.image}  alt={data.image_tab.alt}/>
                </div>
                </div>
                }
            </>}
        
            
        </div>

    )
}

export default function GuideTaille({data}) {


    const [currentTab, setCurrentTab] = useState(1);

    const { image } = data;

    const handleClickBtn = (e, value) => {
        e.preventDefault();
        setCurrentTab(value)
    }
  return (
    <div className={styles.GlobalContainer}>
        <div  className={styles.btnContainerWrapper}>
      <div className={styles.btnContainer}>
        <div className={[styles.btn, currentTab === 1 ? styles.current : ''].join(" ")}
            onClick={(e) => handleClickBtn(e, 1 )}
        >
            <span>Les mesures à prendre</span>
        </div>
        <div className={[styles.btn, currentTab === 2 ? styles.current : ''].join(" ")}
        onClick={(e) => handleClickBtn(e, 2 )}
        >
            <span>Mensurations</span>
        </div>
        
       
      </div>
      </div>
      <SelectorContent code= {currentTab} data={data} />
    </div>
  )
}
