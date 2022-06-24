import React, { useRef, useState, useEffect } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import ProductForm from "../../components/ProductForm";
import ProductImageList from "../../components/ProductImageList";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import ButtonAjouterPanier from "../../components/ButtonAjouterPanier";
import ProductFormMobile from "../../components/ProductFormMobile";
import {v4 as uuidv4} from 'uuid';
import { useCart } from "react-use-cart";
import ModalPopUp from "../../components/modalPopUp/modalPopUp";
import {
  getAttributVariationsTable,
  getproductObjectbyVariation,
  productInStock,
  getproductObjectbyVariationV2,
} from "../../utils/product.utils";


import ProductList from "../../components/ProductList"
import DetailCompositionProduct from "../../components/DetailCompositionProduct";
import CartDetail from "../../components/CartDetail";
import ModalAddTocard from "../../components/ModalAddTocard";


const createInitialState = (attributes) => {
  let initialstate = {};
  for (let i = 0; i < attributes.length; i++) {
    initialstate = {
      ...initialstate,
      [attributes[i].attribute_slug]: attributes[i].variations[0],
    };
  }
  return initialstate;
};

export default function Product(props) {
  const formRef = useRef();
  const productzoneRef = useRef();
  const onScreen = useOnScreen(formRef, 0, "0px");
  const onScreenProductLook = useOnScreen(productzoneRef, 0, "0px");
  const [isDownModule, setDownModule] = useState(true);
  const {title, price, name, id} = props.product;
  const data = props.product;
  const infoBuild = props.product.info_build
  const { addItem, inCart, items } = useCart();
 
  const unique = false;
  const [itemInCart, setItemInCart] = useState(false);

  const [showModal, setShowModal] = useState(false);

const [modalConfig, setModalConfig] = useState({
  title:'',
  message: '',
  is_positif: false,
  is_loading: true,
});

  /** BEGIN Variables gestion */
  /**BEGIN SHOW ADD Panier conditional */

  const attributes =
    Array.isArray(props.product.childrens) && props.product.childrens.length > 0
      ? getAttributVariationsTable(props.product.childrens)
      : null;
      
  const [variationsSelected, setvariationsSelected] = useState(
    attributes ? createInitialState(attributes) : null
  );


  const childSelected = attributes
    ? getproductObjectbyVariationV2(variationsSelected, props.product.childrens)
    : null;
  
  
  const inStock = childSelected
    ? childSelected.cleanResult & (childSelected.price !== "")
      ? true
      : false
    : productInStock(props.product) & (price !== "");

  const productLookList = 
    Array.isArray(props.product.product_look_list) && props.product.product_look_list.length > 0 
      ? props.product.product_look_list
      : null;

  const handleAddToCart = () => {
    const product = {
      id_parent: id,
      id: childSelected ? childSelected.id : id,
      img: props.product.thumnail,
      name: childSelected ? childSelected.name : name,
      price: childSelected ? childSelected.price : price,
      unique,
      idlink: id
    }
    console.log('add to cart')
    console.log(product)
    addItem(product, 1)
    setShowModal(true);
    setModalConfig({
      is_loading: false,
      title: 'Le produit '+product.name+ ' a bien été ajouté dans le panier',
      message: "",
      is_positif: true,
    })
    setTimeout(() => {
      setShowModal(false);

    },2000)
    
   

    
  }
  const productform = {
    inStock,
    variationsSelected,
    setvariationsSelected,
    childSelected,
    attributes,
    isDownModule,
    data,
    handleAddToCart,
    unique,
    itemInCart
  };

  /** END Set pro*/


  const handleScroll = () => {
    setDownModule(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleDown = () => {
    if (!attributes) {
      setDownModule(true);
    }else{
      setDownModule(!isDownModule);
    }
    

   
  };
  useEffect(() => {
    if(inCart(childSelected? childSelected.id : id)){
      setItemInCart(true)
     
    }else{
      setItemInCart(false)
    }
  
  },[childSelected, id, itemInCart,items ])

  return (
 
    <div className="page-product-style-container">
  
      <div
        className={`button-addtocart-mobile-wrapper ${
          isDownModule && attributes
            ? "button-addtocart-mobile-wrapper-down"
            : "button-addtocart-mobile-wrapper-up"
        } ${onScreenProductLook && 'button-addtocart-hide-down'}`}
      >
        {inStock ?
        
            (attributes && !isDownModule && unique && itemInCart) || (!attributes && unique && itemInCart)?
            <div className="paragrphe-porduct-indisponible-mobile-wrapper"><p>Cet article est unique.<br/> Il a bien été ajouté dans votre panier. </p></div> :         <ButtonAjouterPanier
    itemInCart={itemInCart}
    onClick={(e) => {
      e.preventDefault();
      if ((!isDownModule && attributes)) {
        if(unique && itemInCart){

        }else{
          handleAddToCart();
         
        }
        
      } else {
        handleDown();
      }
    if(!attributes){
      if(unique && itemInCart){

      }else{
       
        handleAddToCart();
      }
    }}}
  />  
          : <div className="paragrphe-porduct-indisponible-mobile-wrapper"><p>Cet article est actuellement indisponible</p></div>}
      </div>

      <div
        className={`button-form-title-price-mobile-wrapper ${
          isDownModule ? " button-form-title-price-mobile-wrapper-down mobile-wrapper-hide-midle-down " : "button-form-title-price-mobile-wrapper-up"
        } ${onScreenProductLook && 'mobile-wrapper-hide-down'}`}
      >
        <div
          className={`title-price-mobile-wrapper ${
            isDownModule
              ? "title-price-mobile-wrapper-down"
              : "title-price-mobile-wrapper-up"
          }`}
        >
          <div className={`handle-down`} onClick={()=> {
            handleDown();
          }}/>
          <h1 className="title-mobile">{title}</h1>
          <p className="price-mobile">{attributes && inStock ?  childSelected.price + (childSelected.price !== "" ? '€': ''): price + (price !== "" ? '€': '') }</p>
        </div>
        <ProductFormMobile {...productform} />
      </div>

      <div className="global-container">
        <div
          ref={formRef}
          className="product-description-container content-container"
        >
          <div className="grid-wrapper">
            <div className="left-container">
              <ProductImageList
                data={props.product}
                isDownModule={isDownModule}
              />

              <DetailCompositionProduct data={infoBuild}  />
            </div>
            <div
              className={`right-container ${
                onScreen
                  ? " right-container-fixed"
                  : " right-container-notfixed"
              }`}
            >
              <div
                className="handle-from"
                onClick={() => {
                  handleDown();
                }}
              />
              <ProductForm
                handle={() => {
                  handleDown();
                }}
                {...productform}
              />
            </div>
          </div>
          
        </div>

      </div>

      <div style={{ height: "10vh" }} className="space"/>
      <div ref={productzoneRef} className='global-container'>
        {productLookList && 
          <div className=" produit-look-container content-container">
            <h2 className="porductLookList-title">A porter avec</h2>
            <ProductList productsListData={productLookList} baseLink={'/product/'}/>
          </div>
        }
      </div>
      <ModalPopUp 
          setShowModal = {setShowModal}
          showModal= {showModal}
          modalConfig= {modalConfig}
          />
    </div>
 
  );
}

export async function getStaticProps(context) {
  const id = context.params.product;

  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products/" + id
  );
  const product = await data.json();

  return {
    props: {
      product,
      key: uuidv4(),
     
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const data = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products");

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
