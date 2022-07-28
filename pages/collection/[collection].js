import React, {useEffect} from 'react'
import Head from "next/head";
import Image from "next/image";
import Arrowdown from "../../public/arrow-down.svg"
import ProductList from '../../components/ProductList';
import ShootbookSection from '../../components/ShootbookSection';
import {v4 as uuidv4} from 'uuid';

import { initializeMenuList } from "../../utils/menu.utils";

//redux
import { useDispatch, useSelector } from "react-redux";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import { initializePage } from '../../utils/page.utils';

const CollectionIntro = ({collectionIntroData}) => {
  const {image_principale, description_detaille,introduction} = collectionIntroData
  return (
    <div className="page-collection-introduction content-container">
    <div className="left-container">
      <div className="collection-intro-img-wrapper">
      <Image src={image_principale.url} alt={image_principale.alt} layout="fill" className={"image"} />
      </div>
      <h1 className='title-collection'>{introduction}</h1>
    </div>
    <div className="right-container">
      <h2 className="description-detail">
        {description_detaille}
      </h2>
      <a className='button-down' href="">
        <div className=" arrow-img-wrapper">
          <Image src={Arrowdown} layout="fill" className={"image"} />
        </div>
      </a>
    </div>
  
  </div>
  )
}
export default function Collection(props) {
  const collectionData = props.collection;
  const shootbookData = collectionData.shootbook_collection;

    //Redux
    const dispatch = useDispatch();
    // initalisation menu 
 
    useEffect(() => {
  
      initializePage(props.menuData,props.generalSettings, dispatch)
    }, []);



  return (
    <>
    <Head>
    <title>{props.collection.title}</title>
    <meta name="description" content="Meta description content goes here." />
    </Head>
    <div className="page-collection-style-container">
      <div className="global-container">
        <CollectionIntro collectionIntroData={collectionData}/>
      </div>
      <div className="space" />
      <div className="global-container">
        <ProductList productsListData={collectionData.productlist} baseLink='/product/'/>
      </div>
      <div className="space" />
       { shootbookData && <ShootbookSection shootbookData={shootbookData}/>}
        <div className="space" />
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