import React, {useEffect}from 'react'
import styles from './contact.module.scss'
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../../utils/menu.utils";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import FormContactMessage from '../../components/FormContactMessage/FormContactMessage';

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useTheme } from '../../lib/ThemeContext';
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
export default function Contact(props) {
    const dispatch = useDispatch();
    const menuData = props.menuData
    const {  setThemeblack, setShowHeader } = useTheme();
    useEffect(() => {

        initializeMenuList(menuData, dispatch)
        handleSetGeneralSettings(props.generalSettings, dispatch)
        setThemeblack(true);
        setShowHeader(true);
      }, []);

  return (
    <>
    <Head>
    <title>UNADN - Contact</title>
    <meta name="description" content="Prendre contact avec UNADN" />
    </Head>
    <div className={['global-container'].join(' ')}>
        <div className={styles.global}>
        <h1 className={styles.title}>Nous-Contacter</h1>
        <GoogleReCaptchaProvider
            reCaptchaKey={SITE_KEY}
            scriptProps={{
              async: false,
              defer: false,
              appendTo: "head",
              nonce: undefined,
            }}
          >
          <FormContactMessage />
        </GoogleReCaptchaProvider>
        </div>
    </div>
    </>
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

    const generalSettingsRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/generalsettings", {
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
        generalSettings,
      },
      revalidate: 60,
    };
  }
