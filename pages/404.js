import React, {useEffect}from 'react'
import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../utils/menu.utils";
import { handleSetGeneralSettings } from '../utils/generealSettings.utils';
import { v4 as uuidv4 } from "uuid";
import { initializePage } from '../utils/page.utils';
import styles from '../styles/404.module.scss';
import ButtonPrimary from '../components/ButtonPrimary/ButtonPrimary';
export default function NotFound ( props) {
    const dispatch = useDispatch();

    useEffect(() => {

        initializePage(props.menuData,props.generalSettings, dispatch)
 
      }, []);
  return (
    <div className={styles.global_container}>
      <h1 className={styles.title}>Perdu ?</h1>
      <p className={styles.description}>Désolé, cet page est introuvable</p>
      <div className={styles.btn_wrapper}>
      <ButtonPrimary 
        label={"retourner à l'accueil"}
        internURL={'/'}
      />
      </div>
    </div>
  )
}

export async function getStaticProps(context) {

  

  
  
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
        menuData,
        key: uuidv4(),
        generalSettings
      },
      revalidate: 60,
    };
  }
