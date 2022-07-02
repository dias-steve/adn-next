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
    product_is_individual
  } = product;

  const { addItem } = useCart();

  const [isDownModule, setDownModule] = useState(true);

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

  const handleScroll = () => {
    setDownModule(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });


  return (
    <>
      <div
        className={`button-addtocart-mobile-wrapper ${
          isDownModule && product_is_variable
            ? "button-addtocart-mobile-wrapper-down"
            : "button-addtocart-mobile-wrapper-up"
        } ${onScreenProductLook && "button-addtocart-hide-down"}`}
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
        } ${onScreenProductLook && "mobile-wrapper-hide-down"}`}
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
          <p className="price-mobile">
            {product_selected.price && product_selected.price + "€"}
          </p>
        </div>
        <ProductFormMobile />
      </div>
    </>
  );
}
