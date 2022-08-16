import React, {useEffect}from 'react'
import styles from './contact.module.scss'
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../../utils/menu.utils";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import FormContactMessage from '../../components/FormContactMessage/FormContactMessage';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
export default function Contact(props) {
    const dispatch = useDispatch();
    const menuData = props.menuData
    useEffect(() => {

        initializeMenuList(menuData, dispatch)
        handleSetGeneralSettings(props.generalSettings, dispatch)
 
      }, []);

  return (
    <>
    <Head>
    <title>Contact</title>
    <meta name="description" content="Meta description content goes here." />
    </Head>
    <div className={['global-container'].join(' ')}>
        <div className={styles.global}>
        <h1>Contact</h1>
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
