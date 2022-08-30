import React, { useConext, useRef, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import { useTheme } from "../lib/ThemeContext";
import useOnScreen from "../hooks/useOnScreen";
import ReactTypingEffect from "react-typing-effect";
import uuid from "uuid";
import SplitText from "../utils/Split3.min.js";

import ShootbookSectionV2 from "../components/ShootbookSectionV2/ShootbookSectionV2";
import { useCurrentWidth } from './../hooks/resizeWindowsHook';
import {initializeMenuList } from './../utils/menu.utils';
import { useDispatch, useSelector } from "react-redux";
import { handleSetGeneralSettings } from "../utils/generealSettings.utils";
import { initializePage } from "../utils/page.utils";
import Collection1 from "../components/HomeComponents/Collection1/Collection1";
import Collection2 from "../components/HomeComponents/Collection2/Collection2";
import Interlude from "../components/HomeComponents/Interlude/Interlude";
import Categories from "../components/HomeComponents/Categories/Categories"
import styles from "../styles/Home.module.scss";


import { getWitdthScreen } from "../hooks/useDeviceDectect";
import Preloader from "../components/Preloader/Preloader";
import ScrollTrigger from "gsap/dist/ScrollTrigger";


import gsap from "gsap/dist/gsap";
gsap.registerPlugin(ScrollTrigger);







export default function Home(props) {
  const homeData = props.homeData;

  const dispatch = useDispatch();
  const {setShowHeader} = useTheme();
  const widthScreen = getWitdthScreen() 

  useEffect(() => {
    setShowHeader(true)

    initializePage(props.menuData,props.generalSettings, dispatch)
    
  },[])

  useEffect(() => {return () => ScrollTrigger.getAll().forEach(t => t.kill())},[])
  

  return (
    <>
    <Head>
    <title>UNADN</title>
    <meta name="description" content="Meta description content goes here." />


    </Head>
    

      {homeData ? (
          <div className={styles.global}>
       
          <div className={`global-container ${styles.section}`}>
            <Collection1 gsap={gsap} collectionData={homeData.collection_1} widthScreen = {widthScreen } />
           
          </div>
          <div className={styles.spaceBottomCollection1}  />
          <div className={`global-container ${styles.section}`}>
            <Collection2 gsap={gsap}  collectionData={homeData.collection_2} widthScreen = {widthScreen }/>
          </div>

          <div className={styles.spaceBottomCollection2}  />
          <div className={`global-container ${styles.section}`}>
           {/* <Interlude gsap={gsap}  interludeData={homeData.phrase_intermediaire} widthScreen = {widthScreen } /> */}
          </div>
          <div className={styles.spaceBottomInterlude}  />
          <div className={`global-container ${styles.section}`}>
        { <ShootbookSectionV2 gsap={gsap}  shootbookData={homeData.shootbook_1} widthScreen = {widthScreen } />}
          </div>

          
          
          <div className={styles.spaceBottomShootbook}  />
          <div className={`global-container ${styles.section}`}>
            <Categories
              imageCollectionUrl={homeData.image_category_collection}
              imageShootbookUrl={homeData.image_category_shootbook}
              widthScreen = {widthScreen }
              gsap={gsap} />
          </div>
          <div  className={styles.spaceBottomCategories} />
          </div>
      ) : (
        <p>Chargement</p>
      )}
      </>
  
   
  );
  
}
export async function getStaticProps() {
  const data = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/homedata", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const menuRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/menu", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const generalSettingsRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/generalSettings", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const generalSettings = await generalSettingsRaw.json();
  const homeData = await data.json();
  const menuData= await menuRaw.json()

  return {
    props: {
      homeData,
      menuData,
      generalSettings,
    },
    revalidate: 60, // rechargement toutes les 10s
  };
}
