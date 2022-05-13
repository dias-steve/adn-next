import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import { useTheme } from "../lib/ThemeContext";
import useOnScreen from "../hooks/useOnScreen";

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
    <div className="global-container-shootbook">
      <div ref={ref} className="shootbook-section">
        <div className="title-shootbook-home-container"></div>

        <div className="left-container">
          <div className="image-group-container">
            <div className={"image-container shootbook-img-3"}>
              <Image src={image_3} layout="fill" className={"image"} />
            </div>
            <div className={"image-container shootbook-img-1"}>
              <Image src={image_1} layout="fill" className={"image"} />
            </div>

            <div className={"image-container shootbook-img-2"}>
              <Image src={image_2} layout="fill" className={"image"} />
            </div>

            <div className={"image-container shootbook-img-3"}>
              <Image src={image_3} layout="fill" className={"image"} />
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="text-wrapper">
            <h1 className="title-home-shootbook">{title}</h1>
            <p>{decription_shootbook}</p>
            <Button name="En savoir plus" url="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
