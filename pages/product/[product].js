import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "react-use-cart";
import useOnScreen from "../../hooks/useOnScreen";


import { initialiseProduct, actualiseProductIsInCartToStore } from "../../utils/product.utils";

//Compoents required
import ProductForm from "../../components/ProductForm";
import ProductImageList from "../../components/ProductImageList";
import ProductList from "../../components/ProductList";
import DetailCompositionProduct from "../../components/DetailCompositionProduct/DetailCompositionProduct";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import VideoViewer from "../../components/videoViewer/VideoViewer";
import ImageViewer from "../../components/ImageViewer/ImageViewer";

//redux
import { useDispatch, useSelector } from "react-redux";
import ProductBaseMobile from "../../components/ProductBaseMobile";

//lib
import {useTheme}from "./../../lib/ThemeContext"
import { initializePage } from "../../utils/page.utils";
import YoutubeViewerStory from "../../components/youtubeViewer/YoutubeViewerStory/YoutubeViewerStory";
import ImageSliderV2 from "../../components/ImageSliderV2/ImageSliderV2";



const mapState = (state) => ({
  product: state.product,
  showImageViewer: state.imageviewer.show_image_viewer,
  imagesGallery: state.product.product_gallery_images,
  thumnail: state.product.product_selected.thumnail
});

export default function Product(props) {
  //Redux
  const dispatch = useDispatch();
  const { product, showImageViewer, imagesGallery, thumnail } = useSelector(mapState);
  const { product_selected } = product;


  // initalisation menu 
  const menuData = props.menuData

  //annimation
  const formRef = useRef();
  const productzoneRef = useRef();
  const onScreen = useOnScreen(formRef, 0, "0px");
  const onScreenProductLook = useOnScreen(productzoneRef, 0, "0px");

  // cart gestion
  const { inCart, items } = useCart();

  // raw data hydratation
  const infoBuild = props.product.info_build;
  const productLookList =
    Array.isArray(props.product.product_look_list) &&
    props.product.product_look_list.length > 0
      ? props.product.product_look_list
      : null;
    
  // lib 
  const {  setThemeblack, setShowHeader } = useTheme();
  //intialisation of the page
  useEffect(() => {
    setShowHeader(true);
    initializePage(
      menuData,
      props.generalSettings,
      dispatch
    );

    initialiseProduct(props.product, dispatch);
    setThemeblack(true);
    
  }, []);

  useEffect(() => {
    actualiseProductIsInCartToStore(inCart, product_selected.id, dispatch) 
  }, [product_selected, items]);



  // TODO: ADD Size Guide
  return (
    <>
    <Head>
    <title>{props.product.seo.title_seo}</title>
    <meta name="description" content={props.product.seo.meta_description_seo} />
    </Head>
    
    <div className="page-product-style-container">
      <ProductBaseMobile onScreenProductLook={onScreenProductLook} />
{
   showImageViewer && 
   <ImageViewer />
}

      <div className="global-container">
        <div
          ref={formRef}
          className="product-description-container content-container"
        >
          <div className="grid-wrapper">
            <div className="left-container">
              <div className="image-container-wrapper">
              <ImageSliderV2  notViewer= {true} images={[thumnail,...imagesGallery]} />
              </div>
              <ProductImageList data={props.product} />
  
              {props.product.video&& props.product.video.url &&
                  <div >
          
                  <YoutubeViewerStory video={props.product.video} />
                  </div>
              }
            
              <DetailCompositionProduct data={infoBuild} />
            </div>
            <div
              className={`right-container ${
                onScreen
                  ? " right-container-fixed"
                  : " right-container-notfixed"
              }`}
            >
              <ProductForm />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "10vh" }} className="space" />
      <div ref={productzoneRef} className="global-container">
        {productLookList && (
          <div className=" produit-look-container">
            <h2 className="porductLookList-title">A porter avec</h2>
            <ProductList
              productsListData={productLookList}
              baseLink={"/product/"}
              inSlider = {true}
            />

          </div>
        )}
      </div>


    </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.product;

  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products/" + id
  );
  const product = await data.json();


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
      product,
      menuData,
      generalSettings,
      key: uuidv4(),
    },
    //revalidate: 60,
  };
}

/*

export async function getStaticPaths() {
  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products"
  );

  const products = await data.json();
  

  // on dit le chemin pour chaque articles
  const paths = products.map((item) => ({
    params: { product: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
*/