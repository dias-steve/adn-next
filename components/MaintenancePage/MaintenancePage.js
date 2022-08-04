import Image from 'next/image';
import React, {useState} from 'react';
import NewslettreSubscribForm from '../NewsletterSubcribForm/NewslettreSubscribForm';
import styles from './MaintenancePage.module.scss'
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import logo from './../../public/logo-blanc.svg'
import { useSwipeable } from 'react-swipeable';

export default function MaintenancePage({maintenanceData}) {
 
  
  const backgroundImg = maintenanceData ? maintenanceData?.maintenance_thumbnail : null
  const logoImg = maintenanceData && maintenanceData.maintenance_image_logo.url ? maintenanceData.maintenance_image_logo.url: false
console.log(maintenanceData.maintenance_image_logo)
  const [isUpForm, setIsUpForm] = useState(false)
// swipeable

const handlers = useSwipeable({
  onSwipedDown: () =>setIsUpForm(false),
  onSwipedUp: () =>setIsUpForm(true),
  swipeDuration: 500,
  preventScrollOnSwipe: true,
  trackMouse: true
});
  
  return (
    <div className={styles.globalContainer}>
      <div className={[styles.logoWrapper, isUpForm? styles.logoWrapperSmall:styles.logoWrapperBig ].join(" ")}>
          <Image
            src={logoImg ? logoImg :logo}
            alt={"icon logo"}
            layout="fill"
            className={styles.image}
          />
      </div>
       {backgroundImg && backgroundImg.url &&
        <div className={styles.imageWrapper}>
          <Image
            src={backgroundImg.url}
            alt={backgroundImg.alt}
            layout="fill"
            className={styles.image}
            quality="100"
          />
      </div>
      }
        

        <div {... handlers} className={[styles.baseSection, isUpForm? styles.up :  styles.down].join(" ")}>
          {
            isUpForm &&
            <div className={styles.handleDown} 
            onClick={() => {setIsUpForm(false)}}
          />
          }
          {maintenanceData && maintenanceData.maintenance_message &&
          <p className={[styles.message, isUpForm ? styles.notVisible : styles.visible].join(" ")}>{maintenanceData.maintenance_message}</p>
}
          <div className={[styles.newsletterSubcribFormWrapper, isUpForm ? styles.visible : styles.notVisible].join(" ")}>
            <NewslettreSubscribForm isUpForm= {isUpForm} setIsUpForm={setIsUpForm} />
          </div>
        </div>

        <div className={[styles.btnWrapper, isUpForm ? styles.notVisible : styles.visible].join(" ")}>
          <ButtonPrimary 
            label={`Être notifié de l&apos;ouverture`}
            black={true}
            handleClick= {(e) => {e.preventDefault(); setIsUpForm(true)}}
            />
        </div>

    </div>
  )
}
