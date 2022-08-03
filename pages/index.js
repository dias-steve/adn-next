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
import gsap from 'gsap';
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








export default function Home(props) {
  const homeData = props.homeData;

  const dispatch = useDispatch();
  const {setShowHeader} = useTheme()

  useEffect(() => {
    setShowHeader(true)

    initializePage(props.menuData,props.generalSettings, dispatch)
  },[])
  

  return (
    <>
    <Head>
    <title>UNADN</title>
    <meta name="description" content="Meta description content goes here." />


    </Head>
    
    <div className="page-home-style-container">
      {homeData ? (
        <>
          <div className="global-container">
            <Collection1 collectionData={homeData.collection_1} />
          </div>
          <div style={{ height: "30vh" }} className="space" />
          <div className="global-container">
            <Collection2  collectionData={homeData.collection_2} />
          </div>

          <div style={{ height: "3vh" }} className="space" />
          <div className="global-container">
            <Interlude interludeData={homeData.phrase_intermediaire} />
          </div>
          <div style={{ height: "30vh" }} className="space" />
          <div className="global-container">
          <ShootbookSectionV2 shootbookData={homeData.shootbook_1} />
          </div>

          
          
          <div style={{ height: "1vh" }} className="space" />
          <div className="global-container">
            <Categories
              imageCollectionUrl={homeData.image_category_collection}
              imageShootbookUrl={homeData.image_category_shootbook}
            />
          </div>
          <div style={{ height: "30vh" }} className="space" />
        </>
      ) : (
        <p>Chargement</p>
      )}
    </div>
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
