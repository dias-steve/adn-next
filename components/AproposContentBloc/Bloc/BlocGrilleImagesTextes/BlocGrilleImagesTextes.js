import React from "react";
import Image from "next/image";
import styles from "./BlocGrilleImagesTextes.module.scss";
export default function BlocGrilleImagesTextes({ data }) {
  const { text_1, text_2, text_3, text_4, image_2, image_3, image_4 } = data;
  return (
    <div className={styles.global_container}>
      <div className={styles.grill_wrapper}>
        <div className={[styles.text_1, styles.text_wrapper].join(" ")}>
          <p>{text_1}</p>
        </div>

        {image_2.url && (
          <div className={[styles.wrapper_image_2,styles.wrapper_image ].join(" ")}>
            <Image
              src={image_2.url}
              alt={image_2.alt}
              layout={"fill"}
             
              className={styles.image}
            />
          </div>
        )}
        <div className={[styles.text_2, styles.text_wrapper].join(" ")}>
          <p>{text_2}</p>
        </div>
        <div className={[styles.text_3, styles.text_wrapper].join(" ")}>
          <p>{text_3}</p>
        </div>
        <div className={[styles.text_3_2, styles.text_wrapper].join(" ")}>
          <p>{text_3}</p>
        </div>

        {image_3.url && (
          <div className={[styles.wrapper_image_3,styles.wrapper_image ].join(" ")}>
            <Image
              src={image_3.url}
              alt={image_3.alt}
              layout={"fill"}
     
              className={styles.image}
            />
          </div>
        )}
        <div className={[styles.text_4, styles.text_wrapper].join(" ")}>
          <p>{text_4}</p>
        </div>
        {image_4.url && (
          <div className={[styles.wrapper_image_4,styles.wrapper_image ].join(" ")}>
            <Image
              src={image_4.url}
              alt={image_4.alt}
              layout={"fill"}
              
              className={styles.image}
            />
          </div>
        )}
      </div>
    </div>
  );
}
