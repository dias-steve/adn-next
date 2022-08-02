import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary"
import { useTheme } from "../../lib/ThemeContext";
import useOnScreen from "../../hooks/useOnScreen";
import styles from "./ShootbookV2.module.scss";

export default function ShootbookSection({ shootbookData }) {
  const { themeBlack, setThemeblack } = useTheme();
  const refSection = useRef(null);
  const [reveal, setReveal] = useState(false);

  const {
    id,
    title,
    decription_shootbook,
    image_1,
    image_2,
    image_3,
    image_4,
    video,
  } = shootbookData;
  const onScreen = useOnScreen( refSection);

  useEffect(() => {
    if (onScreen) {
      setReveal(onScreen);
      console.log("onscreen");
    } else {
      setReveal(onScreen);
      console.log("not on screen");
    }
  }, [onScreen]);

  useEffect(() => {
    // si le paragraphe est à l'écran on le montre
    // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
    if (reveal) {
      setThemeblack(false);
      console.log("is-reveal");
    } else {
      setThemeblack(true);
    }
  }, [reveal]);
  return (
    <div ref={refSection} className={styles.section} >
               <div className={styles.track}>
          <div className={styles.wrapper }>
          <div className={styles.trackImages}>
              <img src={image_3.url} alt={image_3.alt} layout="fill" className={styles.images} />
              <img src={image_2.url} alt={image_2.alt} layout="fill" className={styles.images} />
              <img src={image_4.url} alt={image_4.alt} layout="fill" className={styles.images} />
              <img src={image_3.url} alt={image_3.alt} layout="fill" className={styles.images} />
              <img src={image_3.url} alt={image_3.alt} layout="fill" className={styles.images} />
              <img src={image_2.url} alt={image_2.alt} layout="fill" className={styles.images} />
              <img src={image_4.url} alt={image_4.alt} layout="fill" className={styles.images} />
              <img src={image_3.url} alt={image_3.alt} layout="fill" className={styles.images} />
            
 
          </div>
          </div>
          </div>
                    <div className={styles.testWrapper}>
            <h1 className={styles.titleHomeShootbook}>{title}</h1>
            <p >{decription_shootbook}</p>
            <ButtonPrimary black = {true} border ={true} label="Voir le Lookbook"url="/" />
          </div>
        </div>


  );
}
