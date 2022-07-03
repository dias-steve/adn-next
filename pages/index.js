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
import ShootbookSection from "../components/ShootbookSection";
import { useCurrentWidth } from './../hooks/resizeWindowsHook'


const Collection1 = ({ collectionData }) => {

  const { id, title, titre_accueil, short_description, image_1_accueil } =
    collectionData;
    const [show, setshow] = useState(false)

    useEffect(()=>{
      const split = new SplitText("#header-text",{
          type: 'lines', 
          linesClass: "lineChildren",
      });

      //pour avoir le overline 
      const splitParent = new SplitText("#header-text",{
          type: 'lines', 
          linesClass: "lineParent",
      });


      const splitParagraph = new SplitText("#header-paragraphe",{
        type: 'lines', 
        linesClass: "lineChildren",
    });
    const splitParentParagraph = new SplitText("#header-paragraphe",{
      type: 'lines', 
      linesClass: "lineParent",
  });

    
    
      // on annime avec gsap
      gsap.timeline({delay: 0.3}).to(split.lines, {
          duration: 1,
          y:0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2",
      }).to(splitParagraph.lines, {
        duration: 1,
        y:0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2",
    })
    setshow(true)
  },[]);



  return (
    <div className={`home-collection-1 content-container `}>
      <div className="grid-wrapper">
        <div className={"image-container"}>
          <Image src={image_1_accueil.url} alt= {image_1_accueil.alt} layout="fill" className={"image"} />
        </div>

        <h1 id='header-text' className="home-collection-title home-collection-title">
          {titre_accueil}
        </h1>
        <div className="short-description-wrapper">
          <div className="short-description-content">
          
                  <p id= 'header-paragraphe' className="home-collection-short-description">
                  {short_description}
                  </p>
           

            <Button name="En savoir plus" url={`/collection/${ id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Collection2 = ({ collectionData, pageSize }) => {
  const { id, title, titre_accueil, short_description, image_1_accueil } =
    collectionData;

    const collectionRef = useRef();
    

    const [collectionReveal, setCollectionReveal] = useState(false);

    // ref = paragraph
    const onScreen = useOnScreen(collectionRef);
    let annimation = null
    const createAnnimation = () =>{
      annimation = gsap.timeline({delay:0.3})
      .from('#home-collection2-img',
      {
        delay: 0.5,
        duration: 0.5,
        width: 0,
        ease: "power2",
      }).from('#home-collection2-button',
      {
        duration: 0.5,
        borderRadius:100,
        width:0
      }
      )
      console.log('createAnniamtion');
    }


    useEffect(()=>{
        if(onScreen){
          
          setCollectionReveal(onScreen);
          console.log('onscreen titres')
        }else{
          setCollectionReveal(false);
          console.log('not onscreen titres')
        }
    },[onScreen]);


    useEffect(()=>{
      // si le paragraphe est à l'écran on le montre 
      // on n'utilise pas locomotive scroll ici car nous ne pouvons pas utiliser de contidition
      
 
      if(onScreen){

        createAnnimation();
        

      }
      
      return() => {
        if(annimation){
          annimation.kill()
        }
      }


  },[onScreen]);

  return (
    <div  className="home-collection  home-collection-2 content-container">
      <div className="grid-wrapper">
        <div className={"grid-left-container"}>
          <div ref={collectionRef} id='home-collection2-img' className={`image-container ${collectionReveal? 'opacity-1':'opacity-0'}`}>
            <Image
              src={image_1_accueil.url}
              alt={image_1_accueil.alt}
              layout="fill"
              className={"image"}
            />
          </div>
        </div>

        <h1 id = 'headline'  className={`home-collection-title home-collection-title `}>
          {titre_accueil}
        </h1>
        <div className="short-description-wrapper">
          <div className="short-description-content">
            <p className="home-collection-short-description">
              {short_description}
            </p>
            <Button idDiv= "home-collection2-button" name="En savoir plus" url={`/collection/${ id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Interlude = ({ interludeData }) => {
  return (
    <div className="home-interlude-content">
      <div className="interlude-text-wrapper">
        <div className="text-color-zone" />
        <h2 className="home-interlude">{interludeData}</h2>
      </div>
    </div>
  );
};



const Categories = ({ imageCollectionUrl, imageShootbookUrl }) => {
  return (
    <div className="home-categories content-container">
      <div className="left-container sub-container">
        <h1 className="title-categories">Catégories</h1>
        <div className={"image-container"}>
          <Image src={imageCollectionUrl.url} alt={imageCollectionUrl.alt} layout="fill" className={"image"} />
        </div>
      </div>
      <div className="right-container sub-container">
        <h1 className="title-categories">Shootbooks</h1>
        <div className={"image-container"}>
          <Image src={imageShootbookUrl.url} alt={imageShootbookUrl.alt} layout="fill" className={"image"} />
        </div>
      </div>
    </div>
  );
};
export default function Home(props) {
  const homeData = props.homeData;
  


  

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

          <div style={{ height: "30vh" }} className="space" />
          <div className="global-container">
            <Interlude interludeData={homeData.phrase_intermediaire} />
          </div>
          <div style={{ height: "30vh" }} className="space" />
          <div className="global-container global-container-home-shootbook">
            <ShootbookSection shootbookData={homeData.shootbook_1} />
          </div>
          <div style={{ height: "50vh" }} className="space" />
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

  const homeData = await data.json();

  return {
    props: {
      homeData,
    },
    revalidate: 60, // rechargement toutes les 10s
  };
}
