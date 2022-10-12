import React, {useEffect} from 'react'
import Head from "next/head";
import Image from "next/image";
import Arrowdown from "../../public/arrow-down.svg"
import ProductList from '../../components/ProductList';
import ShootbookSectionV2 from '../../components/ShootbookSectionV2/ShootbookSectionV2';
import {v4 as uuidv4} from 'uuid';

import { initializeMenuList } from "../../utils/menu.utils";

//redux
import { useDispatch, useSelector } from "react-redux";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import { initializePage } from '../../utils/page.utils';

import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Preloader from '../../components/Preloader/Preloader';
import { useTheme } from '../../lib/ThemeContext';
import ProductNav from '../../components/ProductNav/ProductNav';
gsap.registerPlugin(ScrollTrigger);

const CollectionIntro = ({collectionIntroData}) => {
  const {image_principale, description_detaille,introduction} = collectionIntroData
  return (
    <>

    <div className="page-collection-introduction content-container">
 
    <div className="left-container">
      <div className="collection-intro-img-wrapper">
      <Image src={image_principale.url} alt={image_principale.alt} layout="fill" className={"image"} />
      </div>
      <h1 className='title-collection'>{introduction}</h1>
    </div>
    <div className="right-container">
      <p className="description-detail">
        {description_detaille}
      </p>

    </div>
  
  </div>
  </>
  )
}
export default function Collection(props) {
  const collectionData = props.collection;
  const lookbookId = collectionData.shootbook_collection_id;
  const nextCollectionId = collectionData?.next_collection?.ID
  const {  setThemeblack, setShowHeader } = useTheme();

    //Redux
    const dispatch = useDispatch();
    // initalisation menu 
 
    useEffect(() => {
  
      initializePage(props.menuData,props.generalSettings, dispatch)
      setThemeblack(true);
      setShowHeader(true);
    }, []);


    console.log('[Collection]: lookbook data')
  

  return (
    <>
    <Head>
    <title>{props.collection.seo.title_seo}</title>
    <meta name="description" content={props.collection.seo.meta_description_seo} />
    </Head>
    <div className="page-collection-style-container">
      <div className="global-container">
        <CollectionIntro collectionIntroData={collectionData}/>
      </div>
      <div className="space" />
      <div className="global-container collection-list-container">
        <ProductList productsListData={collectionData.productlist} baseLink='/product/'/>
      </div>
      <div className="space" />
      <div className="global-container">

      <ProductNav lookbokLink={lookbookId ?'/lookbook/'+lookbookId : null} collectionLink={nextCollectionId ?'/collection/'+nextCollectionId : null} />
      </div>
  
    </div>
    </>
  )
}
export async function getStaticProps(context) {
  const id = context.params.collection;

  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA +"/collections/"+id)
  const collection = await data.json();

  const menuRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/menu", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const menuData= await menuRaw.json()

  const generalSettingsRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/generalSettings", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const generalSettings = await generalSettingsRaw.json();
  return {
    props: {
      collection,
      menuData,
      key: uuidv4(),
      generalSettings
    },
    revalidate: 60,
    
  };
}

export async function getStaticPaths() {

  const data = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA+"/collections");

  const collections = await data.json();
  
  // on dit le chemin pour chaque articles
  const paths = collections.map(item => ({
    params: { collection: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  }
}