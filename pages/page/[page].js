import React, {useEffect} from 'react'
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";

//redux
import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../../utils/menu.utils";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';

import styles from './page.module.scss';
export default function Page(props) {
    const dispatch = useDispatch();
    const menuData = props.menuData
    useEffect(() => {

        initializeMenuList(menuData, dispatch)
        handleSetGeneralSettings(props.generalSettings, dispatch)
 
      }, []);

  return (
    <>
    <Head>
    <title>{props.page.title}</title>
    <meta name="description" content="Meta description content goes here." />
    </Head>
    <div className='global-container'>
      <div className="content-container">
      
     
      <div className={styles.contentWrapper}>
      <h1 className={styles.title}>{props.page.title}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{__html: props.page.content}}/>
      </div>
      </div>
      
    </div>
    </>
  )
}

export async function getStaticProps(context) {
    const id = context.params.page;
  
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/page/" + id
    );
    const page = await data.json();
  
  
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
        page,
        menuData,
        key: uuidv4(),
        generalSettings,
      },
      revalidate: 60,
    };
  }
  
  export async function getStaticPaths() {
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/page"
    );
  
    const pages = await data.json();
    
  
    // on dit le chemin pour chaque articles
    const paths = pages.map((item) => ({
      params: { page: item.id.toString() },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }