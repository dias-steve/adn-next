import React, {useEffect}from 'react';
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { useTheme } from '../../lib/ThemeContext';

import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../../utils/menu.utils";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import styles from './Apropos.module.scss'
import AproposContentBloc from '../../components/AproposContentBloc/AproposContentBloc';

export default function Apropos(props) {

  const dispatch = useDispatch();
  const menuData = props.menuData
  const {  setThemeblack, setShowHeader } = useTheme();
  const aproposData = props.apropos;

  useEffect(() => {

      initializeMenuList(menuData, dispatch)
      handleSetGeneralSettings(props.generalSettings, dispatch)
      setThemeblack(true);
      setShowHeader(true);
    }, []);
  return (
    <div className= {styles.gloabal}>
      <h1> {aproposData.title}</h1>
      <AproposContentBloc contentList={aproposData.content}/>
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

  const generalSettingsRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/generalsettings", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const generalSettings = await generalSettingsRaw.json();

  const aproposData = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/aproposData", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const apropos = await aproposData.json();
  return {
    props: {
      menuData,
      key: uuidv4(),
      generalSettings,
      apropos
    },
    revalidate: 60,
  };
}