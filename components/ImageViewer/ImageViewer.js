import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import blurImg from "../../public/imageblur.jpg";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ImageViewer-components-styles.module.scss";
import crossIcon from "../../public/icons-cross-green.svg";
import { setLazyProp } from "next/dist/server/api-utils";
import { v4 as uuidv4 } from "uuid";
import {
  handleSetImageGallery,
  handleSetShowImageViewer,
} from "../../utils/imageViewer.utils";

const mapState = (state) => ({
  imagesGallery: state.imageviewer.image_gallery,
});

const SliderStatus = ({ currentIndex, maxIndex }) => {
  const widthProgressPourcent = 10;
  const margin = (currentIndex * 100) / maxIndex - widthProgressPourcent;
  return (
    <div className={styles.sliderStatusContainer}>
      <div className={styles.baseBar}>
        <div
          className={styles.progressBar}
          style={{
            width: widthProgressPourcent + "%",
            marginLeft: margin + "%",
          }}
        />
      </div>
    </div>
  );
};

export const BtnClose = ({ handleClick }) => {
  return (
    <div
      className={styles.btnCloseContainer}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className={styles.imageBtnWrapper}>
        <Image
          src={crossIcon}
          alt={"icon cross"}
          layout="fill"
          className={styles.imagebtn}
        />
      </div>
    </div>
  );
};
export default function ImageViewer() {
  const imagesTrackRef = useRef();
  const imagesTrackRef2 = useRef();
  const { imagesGallery } = useSelector(mapState);

  const [scrollX, setScrollX] = useState(0);
  const [sizeX, setSizeX] = useState(0);
  const dispatch = useDispatch();

  const handleScroll = (e) => {
    setScrollX(e.target.scrollLeft);
  };

  useEffect(() => {
    setTimeout(() => {
      setSizeX(
        imagesTrackRef2.current.offsetWidth - imagesTrackRef.current.offsetWidth
      );
    }, 300);
  }, [imagesTrackRef2]);

  useEffect(() => {
    if (imagesTrackRef && imagesTrackRef.current) {
      imagesTrackRef.current.addEventListener("scroll", (e) => handleScroll(e));
      return () => {
        if (imagesTrackRef && imagesTrackRef.current) {
          imagesTrackRef.current.removeEventListener("scroll", (e) =>
            handleScroll(e)
          );
        }
      };
    }
  });

  return (
    <div className={styles.containerGlobal}>
      <div className={styles.btnCloseContainer}>
        <BtnClose
          handleClick={() => {
            handleSetImageGallery([], dispatch);
            handleSetShowImageViewer(false, dispatch);
          }}
        />
      </div>
      <div className={styles.sliderStatusContainer}>
        <SliderStatus currentIndex={scrollX} maxIndex={sizeX} />
      </div>
      <div ref={imagesTrackRef} className={styles.viewerWrapper}>
        <div ref={imagesTrackRef2} className={styles.trackImages}>
          {imagesGallery[0].url &&
            imagesGallery.map((imageItem) => (
              <img
                key= {uuidv4()}
                src={imageItem.url ? imageItem.url : blurImg}
                alt={imageItem.alt ? imageItem.alt : "bruit"}
                layout="fill"
 
                className={styles.image}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
