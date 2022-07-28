import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";

//utils
import { handleAddToCart,
  PRODUCT_ALREADY_IN_CART_MESSAGE,
  PRODUCT_OUT_OF_STOCK_MESSAGE } from "../utils/product.utils";

//component
import ButtonAjouterPanier from "./ButtonAjouterPanier";
import ProductFormMobile from "./ProductFormMobile";

const mapState = (state) => ({
  product: state.product,
});


export default function ProductBaseMobile({ onScreenProductLook }) {
 
  const dispatch = useDispatch();
  const { product } = useSelector(mapState);
  const {
    product_selected,
    raw_product_data,
    is_in_stock_product,
    product_is_in_cart,
    quantity_to_buy,
    product_is_variable,
    product_is_individual,
    multi_price
  } = product;

  const { addItem } = useCart();

  const [isDownModule, setDownModule] = useState(true);
  const [hidebase , setHideBase] = useState(true)
  
  /**
   *Fonctions annimation
   */
  const isAddToCartavailable =  () => {
    if(product_is_variable){
      if (isBtnAddToCartForPullUpBaseMobil()){
        return true
      }else{
        if (isProductAvailbleToPutinCartMore()){
          return true
        }
      }

    }else{
      if (isProductAvailbleToPutinCartMore()){
        return true
      }
    }
    return false
  }
  
  const isBtnAddToCartForPullUpBaseMobil = () => {
    console.log(product_is_variable+'&'+isDownModule);
    if (product_is_variable && isDownModule){
      return true
    }else{
      return false
    }
  }

  const isProductAvailbleToPutinCartMore = () =>{
    if(product_is_individual && product_is_in_cart){
      return false;
    }else{
      return true;
    }
  }

  const handleAddToCartMobile = () => {
    if (!isBtnAddToCartForPullUpBaseMobil()) {
      if (isProductAvailbleToPutinCartMore()) {
        handleAddToCart(
          product_selected,
          addItem,
          dispatch,
          quantity_to_buy
        );
      }
    } else {
      setDownModule(false);
    }
  }

  const handleScroll = (e) => {
    setDownModule(true);
    const window = e.currentTarget
    if(window.scrollY<=0){
      setHideBase(true)
    }else{
      if(onScreenProductLook){
        setHideBase(true)
      }else{
        setHideBase(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", (e)=> (handleScroll(e)));
    return () => window.removeEventListener("scroll", (e) =>(handleScroll(e)));
  });


  return (
    <>
      <div
        className={`button-addtocart-mobile-wrapper ${
          isDownModule && product_is_variable
            ? "button-addtocart-mobile-wrapper-down"
            : "button-addtocart-mobile-wrapper-up"
        } ${ hidebase&& "button-addtocart-hide-down"}`}
      >
        {is_in_stock_product ? (  
          isAddToCartavailable()
             ? (
            <ButtonAjouterPanier
              itemInCart={product_is_in_cart}
              onClick={(e) => {
                e.preventDefault();
                handleAddToCartMobile();
              }}
            />
          ): (
            <div className="paragrphe-porduct-indisponible-mobile-wrapper">
              <p dangerouslySetInnerHTML={{__html: PRODUCT_ALREADY_IN_CART_MESSAGE}}/>
             
            </div>
          )
        ) : (
          <div className="paragrphe-porduct-indisponible-mobile-wrapper">
            <p dangerouslySetInnerHTML={{__html: PRODUCT_OUT_OF_STOCK_MESSAGE}}/>
          </div>
        )}
      </div>

      <div
        className={`button-form-title-price-mobile-wrapper ${
          isDownModule
            ? " button-form-title-price-mobile-wrapper-down mobile-wrapper-hide-midle-down "
            : "button-form-title-price-mobile-wrapper-up"
        } ${hidebase && "mobile-wrapper-hide-down"}`}
      >
        <div
          className={`title-price-mobile-wrapper ${
            isDownModule
              ? "title-price-mobile-wrapper-down"
              : "title-price-mobile-wrapper-up"
          }`}
        >
          <div
            className={`handle-down`}
            onClick={() => {
              setDownModule(true);
            }}
          />
          <h1 className="title-mobile">{raw_product_data.title}</h1>
         

            { multi_price?.have_multi_price ? 
            <>
              <p className="product-min-price">À partir de {multi_price.price_min}€</p>
              <p className={`price-mobile ${
                  isDownModule
                  ? 'not-visible'
                  : 'visible'
              }`}>
                        {product_selected.price && product_selected.price + "€"}
              <span className={`regular-price `}>
                {product_selected?.on_sale? (product_selected.regular_price+"€") : ""}
              </span>
              </p>
              </> : 
                        <p className="price-mobile">
                        {product_selected.price && product_selected.price + "€"}
              <span className="regular-price">{product_selected?.on_sale? (product_selected.regular_price+"€") : ""}</span>       </p>

            }
            
   
        </div>
        <ProductFormMobile />
      </div>
    </>
  );
}
