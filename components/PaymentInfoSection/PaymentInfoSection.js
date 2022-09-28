import React from 'react';
import styles from './PaymentInfoSection.module.scss';
import Image from 'next/image';

import { useDispatch, useSelector } from "react-redux";

const mapState = (state) => ({
    generalsettings: state.generalsettings
}) 

export default function PaymentInfoSection() {

    const {generalsettings} = useSelector(mapState);
    console.log(generalsettings);


  return (
    <div className={styles.global}>
        <h2 className={styles.title}>Paiements sécurisés</h2>
        { generalsettings?.general_settings?.payment_info?.description &&
            <p className={styles.description}>{ generalsettings.general_settings.payment_info.description} </p>
        }

        { generalsettings?.general_settings?.payment_info?.logo_image?.url &&
            <div className={styles.image_wrapper}>
                <Image
                    src= {generalsettings.general_settings.payment_info.logo_image.url}
                    alt= {generalsettings.general_settings.payment_info.logo_image.alt}
                    layout="fill"
                    objectFit="contain"
                    className={styles.image}
                />
            </div>
        }

      
    </div>
  )
}
