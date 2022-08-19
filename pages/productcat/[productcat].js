import React, {useEffect} from 'react'
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";

//redux
import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../../utils/menu.utils";
import ProductList from '../../components/ProductList';

import styles from "./productcat.module.scss";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import { initializePage } from '../../utils/page.utils';
import { useTheme } from '../../lib/ThemeContext';
export default function Productcat(props) {
    const dispatch = useDispatch();
    const {  setThemeblack, setShowHeader } = useTheme();
    useEffect(() => {

    
        initializePage(props.menuData,props.generalSettings, dispatch)
        setThemeblack(true);
        setShowHeader(true);
      }, []);
    console.log(props.productcat.product_cat_info.name)
  return (
    <>

    <Head>
    <title>{props.productcat.product_cat_info.name}</title>
    <meta name="description" content="Meta description content goes here." />
    </Head>

    <div className='global-container'>
      <div className='content-container'>
        <div className={styles.headerContainer}>
        <h1 className={styles.title}>{props.productcat.product_cat_info.name}</h1>
      </div>
      </div>

    
    
    </div>

    <div className='global-container'>

    <ProductList productsListData={props.productcat.product_list} baseLink='/product/'/>

  </div>
    </>
  )
}

export async function getStaticProps(context) {
    const id = context.params.productcat;
  
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/product_cat/" + id
    );
    const productcat = await data.json();
  
  
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
    const menuData= await menuRaw.json()
  
  
    return {
      props: {
        productcat,
        menuData,
        generalSettings,
        key: uuidv4(),
      },
      revalidate: 60,
    };
  }
  
  export async function getStaticPaths() {
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/product_cat"
    );
  
    const productcats = await data.json();
    
  
    // on dit le chemin pour chaque articles
    const paths = productcats.map((item) => ({
      params: { productcat: item.id.toString() },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }