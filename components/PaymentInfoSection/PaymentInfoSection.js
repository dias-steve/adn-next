import React from 'react';
import styles from './PaymentInfoSection.module.scss';
import Image from 'next/image';

import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';

const mapState = (state) => ({
    generalsettings: state.generalsettings
}) 

export default function PaymentInfoSection() {

    const {generalsettings} = useSelector(mapState);
    console.log(generalsettings);


  return (
    <>
    <div className={styles.global}>
        <h2 className={styles.title}>{generalsettings?.general_settings?.payment_info?.title}</h2>
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
        { generalsettings?.general_settings?.payment_info?.link_learn_more &&
            generalsettings.general_settings.payment_info.link_learn_more != "" &&

            <Link href={generalsettings.general_settings.payment_info.link_learn_more}>
            <a>
            <button className={styles.btn_more}>
                En savoir plus
            </button>
            </a>
            </Link>
        }
      
    </div>

    <div className={styles.global}>
        
        <h2 className={styles.title}>{generalsettings?.general_settings?.shipment_info?.title}</h2>
        { generalsettings?.general_settings?.shipment_info?.description &&
            <p className={styles.description}>{ generalsettings.general_settings.shipment_info.description} </p>
        }

        { generalsettings.general_settings?.shipment_info?.link_learn_more &&
            generalsettings.general_settings.shipment_info.link_learn_more != "" &&

            <Link href={generalsettings.general_settings.shipment_info.link_learn_more}>
            <a>
            <button className={styles.btn_more}>
                En savoir plus
            </button>
            </a>
            </Link>
        }


      
    </div>
    </>
  )
}
