import React, {useEffect} from 'react'
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import arrow from "../../public/arrowgreen.svg"
//redux
import { useDispatch, useSelector } from "react-redux";
import { initializeMenuList } from "../../utils/menu.utils";
import { handleSetGeneralSettings } from '../../utils/generealSettings.utils';
import { initializePage } from '../../utils/page.utils';
import { useTheme } from '../../lib/ThemeContext';
import styles from './lookbook.module.scss'
import ShootbookCarrousel from '../../components/ShootbookCarrousel/ShootbookCarrousel';
import Image from 'next/image';
import LookbookSlide from '../../components/LookbookSlider/LookbookSlide/LookbookSlide';
import LookbookSlider from '../../components/LookbookSlider/LookbookSlider';
import { createImageTableCaroussel } from '../../utils/lookbook.utils';
import { setFooterGreen } from '../../redux/Footer/footer.actions';




export default function Lookbook(props) {
    const dispatch = useDispatch();
    const {  setThemeblack, setShowHeader } = useTheme();
    const { title,  decription_shootbook, media_list, images_apercu} = props.lookbook

    useEffect(() => {


        initializePage(props.menuData,props.generalSettings, dispatch)
        setThemeblack(false);
        setShowHeader(true);
        dispatch(
        setFooterGreen(true)
        )

      }, []);

      console.log(props)
  return (
    <>
    <Head>
    <title>{props.lookbook.seo.title_seo}</title>
    <meta name="description" content={props.lookbook.seo.meta_description_seo}/>
    </Head>
    <div className={styles.background}>
    {images_apercu &&
    <ShootbookCarrousel
      images={createImageTableCaroussel(images_apercu)}
    />
    }
    <div className={styles.Blurfilter}/>
      </div>
    <div className={styles.globalContainer}>

    <LookbookSlider
      description={ decription_shootbook}
      title={title}
      media_list={media_list}
     />

    </div>
    </>
  )
}

export async function getServerSideProps(context) {
    const id = context.params.lookbook;
  
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/shootbooks/" +id
    );
    const lookbook = await data.json();
  
  
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
        lookbook,
        menuData,
        key: uuidv4(),
        generalSettings
      },
     // revalidate: 60,
    };
  }
  /*
  export async function getStaticPaths() {
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/shootbooks"
    );
  
    const lookbooks = await data.json();
    
  
    // on dit le chemin pour chaque articles
    const paths = lookbooks.map((item) => ({
      params: { lookbook: item.id.toString() },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }
  */