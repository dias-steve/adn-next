import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { useTheme } from "../../lib/ThemeContext";
import useOnScreen from "../../hooks/useOnScreen";
import styles from "./Shootbook.module.scss";

export default function ShootbookSection({ shootbookData }) {
  const { themeBlack, setThemeblack } = useTheme();
  const ref = useRef();
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
  const onScreen = useOnScreen(ref);

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
    <div className={styles.globalContainerHomeShootbook} >
      <div  className={styles.shootbookSection}>
       

        <div className={styles.leftContainer}>
          <div className={styles.imageGroupContainer}>
            <div className={[styles.imageContainer, styles.shootbookImg3].join(" ")}>
              <Image src={image_3.url} alt={image_3.alt} layout="fill" className={styles.image} />
            </div>
            <div className={[styles.imageContainer, styles.shootbookImg2].join(" ")}>
              <Image src={image_1.url} alt={image_1.alt} layout="fill" className={styles.image} />
            </div>

            <div className={[styles.imageContainer, styles.shootbookImg1].join(" ")}>
              <Image src={image_2.url} alt={image_2.alt} layout="fill" className={styles.image} />
            </div>

            <div className={[styles.imageContainer, styles.shootbookImg3].join(" ")}>
              <Image src={image_4.url} alt={image_4.alt} layout="fill" className={styles.image} />
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.testWrapper}>
            <h1 className={styles.titleHomeShootbook}>{title}</h1>
            <p ref={ref}>{decription_shootbook}</p>
            <Button  name="En savoir plus" url="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
