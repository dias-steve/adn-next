import React, { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

//icons
import blurImg from "../../public/imageblur.jpg";
import chevronRight from "../../public/chevron-right.svg";
import chevronLeft from "../../public/chevron-left.svg";
import preload from "../../public/preloader.png"
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
  const [screenWidth, setScreenWidth] = useState(0);
  const [y, setY] = useState(0);

  const [touchPosition, setTouchPosition] = useState(null)

const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
    console.log('touch')
}



  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  

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

  const handleTouchMove = (e) => {
    const touchDown = touchPosition
  
    if(touchDown === null) {
        return
    }
  
    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch
  
    if (diff > 5) {
      handleNextImage()
    }
  
    if (diff < -5) {
      handlePrevImage()
    }
  
    setTouchPosition(null)
  }

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

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])


  return (
    <div className={styles.containerGlobal}

    >
      <div className={styles.windowSlider}
                          onTouchStart={(e)=> {handleTouchStart(e); }}
                          onTouchMove={(e) => {handleTouchMove(e);}} 
      >
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
            {touchPosition ? 'toucho:'+touchPosition :'null'}
          </div>
        )}
        <div className = {[styles.sliderStatusWrapper].join("")}>
         <SliderStatus 
                currentIndex = {currentImageIndex+1}
                maxIndex = {images.length}/>
    
        </div>

            <div className= {styles.trackImages} 

            style = {{marginLeft: ((-currentImageIndex)*(screenSize.dynamicWidth > 770 ? 40: 100))+'vw'}}>

          
          {images &&
            images.map((image) => (
                <>
                {/*images[currentImageIndex].url === image.url &&*/
                <div className={styles.imageWrapper} >
                <Image
                  loading="lazy"
                  src={image.url ? image.url : blurImg}
                  alt={image ? image.alt : "bruit"}
                  layout="fill"
                  className={styles.image}
                  key={uuidv4()}
                />
                </div>
                }
                </>
     
            ))}
              </div>
   
      </div>
    </div>
  );
}
