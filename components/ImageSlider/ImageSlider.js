import React, { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

//icons
import blurImg from "../../public/imageblur.jpg";
import chevronRight from "../../public/chevron-right.svg";
import chevronLeft from "../../public/chevron-left.svg";
//styles
import styles from "./ImageSlider-component-styles.module.scss";
import BtnNextPrev from "../BtnNextPrev/BtnNextPrev.js";

const mapState = (state) => ({
  images: state.product.product_gallery_images,
});

const SliderStatus = ({ currentIndex, maxIndex }) => {
  const widthProgressPourcent = (currentIndex * 100) / maxIndex;
  return (
    
    <div className={styles.sliderStatusContainer}>
  
      <div className={styles.baseBar} >
      <div
        className={styles.progressBar}
        style={{ width: widthProgressPourcent + "%" }}
      />
      </div>
    </div>
  );
};
export default function ImageSlider() {
  const { images } = useSelector(mapState);
  const [currentImageIndex, setcurrentImageIndex] = useState(0);
  const [showBtnNextPrev,setShowBtnNextPrev] = useState(true);
  const [showStateStatus, setShowStateStatus] = useState(false);
  const [y, setY] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setcurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setcurrentImageIndex(currentImageIndex - 1);
    }
  };

  const haveNext = () => {
    if (currentImageIndex >= images.length - 1) {
      return false;
    }
    return true;
  };

  const havePrev = () => {
    if (currentImageIndex <= 0) {
      return false;
    }

    return true;
  };


  const handleScroll = (e) => {
    const window = e.currentTarget;

    if (window.scrollY > y+600 || window.scrollY < y-600) {
        setShowBtnNextPrev(true);
        setTimeout(() =>{
            setShowBtnNextPrev(false)
        },2000)

        setY(window.scrollY)

    }

  };
  useEffect(() => {
    window.addEventListener("scroll",(e) => {handleScroll(e)});
    return () => window.removeEventListener("scroll", (e) => {handleScroll(e)});
  });


  return (
    <div className={styles.containerGlobal}>
      <div className={styles.windowSlider}>
        {havePrev() && (
          <div  className={[styles.btnNextPrev, styles.btnNextLeft,showBtnNextPrev ? styles.btnVisible: styles.btnNotVisible].join(" ")}>
            <BtnNextPrev
              isLeft={true}
              handleOnClick={() => {
                handlePrevImage();
              }}
            />
          </div>
        )}
        {haveNext() && (
          <div className={[styles.btnNextPrev, styles.btnNextRight,showBtnNextPrev ?  styles.btnVisible:styles.btnNotVisible ].join(" ")}>
            <BtnNextPrev
              isLeft={false}
              handleOnClick={() => {
                handleNextImage();
              }}
            />
          </div>
        )}
        <div className = {[styles.sliderStatusWrapper].join("")}>
            {/* <SliderStatus 
                currentIndex = {currentImageIndex+1}
                maxIndex = {images.length}
            /> */}
        </div>
        <div className={styles.imageWrapper}>
          {images &&
            images.map((image) => (
              <CSSTransition // mise en place des transition d'apparition et disparition
                in={images[currentImageIndex].url === image.url} // trasition s'active quannd le state ativeMenu est 'main
                unmountOnExit // on démonte l'enfant à la sortie
                timeout={0}
                classNames={"imageslideanimation"}
                // le préfixe des class utilisé pour les transition enter, entrer-active, exit, exit-active
                // trasion height > calcule de la hauteur de l'élement avant l'apparition
                key={uuidv4()}
              >
                <Image
                  src={image.url ? image.url : blurImg}
                  alt={image ? image.alt : "bruit"}
                  layout="fill"
                  className={styles.image}
                  key={uuidv4()}
                />
              </CSSTransition>
            ))}
        </div>
      </div>
    </div>
  );
}
