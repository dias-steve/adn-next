import React, { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from 'react-swipeable';
//icons
import blurImg from "../../public/imageblur.jpg";
import chevronRight from "../../public/chevron-right.svg";
import chevronLeft from "../../public/chevron-left.svg";
import preload from "../../public/preloader.png"
//styles
import styles from "./ImageSliderV2-component-styles.module.scss";
import BtnNextPrev from "../BtnNextPrev/BtnNextPrev.js";

//utit components
import {handleSetShowImageViewer, handleSetImageGallery} from "../../utils/imageViewer.utils"



const SliderStatus = ({ currentIndex, maxIndex }) => {

  const widthProgressPourcent = (1 * 100) / maxIndex;
  const margin =  ((currentIndex * 100) / maxIndex)-widthProgressPourcent ;
  return (
    
    <div className={styles.sliderStatusContainer}>
  
      <div className={styles.baseBar} >
      <div
        className={styles.progressBar}
        style={{ width: widthProgressPourcent + "%",
            marginLeft: margin+"%"
      }}
      />
      </div>
    </div>
  );
};
export default function ImageSliderV2({images, notViewer}) {

  const [currentImageIndex, setcurrentImageIndex] = useState(0);
  const [showBtnNextPrev,setShowBtnNextPrev] = useState(true);
  const [showStateStatus, setShowStateStatus] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [toShowJson, setToShowJson] = useState({title: "null"});
  const [showStart, setShowStart] = useState(0)
  const [y, setY] = useState(0);

  const [touchPosition, setTouchPosition] = useState(null);

  

  const dispatch = useDispatch()
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
    }else{

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
    setToShowJson({ok: "ok"})
    setToShowJson(e.touches[0].clientX)
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
      setToShowJson({ok: "back"})
    }
  
    setTouchPosition(null)
  }

  const handleScroll = (e) => {
    const window = e.currentTarget;

    if (window.scrollY > y+600 || window.scrollY < y-600 || true) {
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
const setShowStart2 = (e) => {
  setShowStart(e.touches[0].clientX);
  e.preventDefault();
}

// swipeable

const handlers = useSwipeable({
  onSwipedLeft: () =>handleNextImage(),
  onSwipedRight: () =>handlePrevImage(),
  swipeDuration: 500,
  preventScrollOnSwipe: true,
  trackMouse: true
});

// ImageViewer

const handleOpenImageViewer = () => {
  handleSetImageGallery(images, dispatch)
  handleSetShowImageViewer(true, dispatch)
}
  return (
    <div className={styles.containerGlobal}

    >
      <div>

            </div>
      <div {... handlers} className={styles.windowSlider}
                      
                     
                     
                          // TODO:  Swipe Make it work
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
      
          </div>
        )}
        { images.length > 1 &&
        <div className = {[styles.sliderStatusWrapper].join("")}>
          
         <SliderStatus 
                currentIndex = {currentImageIndex+1}
                maxIndex = {images.length}/>
    
        </div>
        }

            <div className= {styles.trackImages} 

            style = {{marginLeft: ((-currentImageIndex)*(
              screenSize.dynamicWidth >1500 ? 600 :
              screenSize.dynamicWidth > 770 ? (2*20): 94))+
              (screenSize.dynamicWidth > 1500 ? 'px':
              'vw')
              
            }}
            onClick = {() => {notViewer && handleOpenImageViewer({currentImageIndex})}}
            >

              
              {images &&
                images.map((image) => (
               
           
                    <div      key={uuidv4()} className={styles.imageWrapper} >
                    <Image
                    
                      src={image.url ? image.url : blurImg}
                      alt={image ? image.alt : "bruit"}
                      layout="fill"
                      className={styles.image}
                      key={uuidv4()}
                      objectFit={'cover'}
                  
                    />
                    </div>
                    
            
        
                ))}
          </div>
   
      </div>
    </div>
  );
}
