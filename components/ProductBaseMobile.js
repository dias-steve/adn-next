import React, { useState, useEffect } from "react";

import ButtonAjouterPanier from "./ButtonAjouterPanier";
import ProductFormMobile from "./ProductFormMobile";
import { useCart } from "react-use-cart";

import { handleAddToCart } from "../utils/product.utils";

import { useDispatch, useSelector } from "react-redux";

const mapState = (state) => ({
  product: state.product,
});
export default function ProductBaseMobile({ onScreenProductLook }) {
  const { product } = useSelector(mapState);
  const dispatch = useDispatch();
  const { addItem } = useCart();
  const {
    product_selected,
    raw_product_data,
    attributes,
    is_in_stock_product,
    product_is_in_cart,
    quantity_to_buy,
  } = product;
  const unique = raw_product_data.is_unique;
  const [isDownModule, setDownModule] = useState(true);
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
    } else {
      setDownModule(!isDownModule);
    }
  };
  return (
    <>
      <div
        className={`button-addtocart-mobile-wrapper ${
          isDownModule && attributes
            ? "button-addtocart-mobile-wrapper-down"
            : "button-addtocart-mobile-wrapper-up"
        } ${onScreenProductLook && "button-addtocart-hide-down"}`}
      >
        {is_in_stock_product ? (
          (attributes && !isDownModule && unique && product_is_in_cart) ||
          (!attributes && unique && product_is_in_cart) ? (
            <div className="paragrphe-porduct-indisponible-mobile-wrapper">
              <p>
                Cet article est unique.
                <br /> Il a bien été ajouté dans votre panier.{" "}
              </p>
            </div>
          ) : (
            <ButtonAjouterPanier
              itemInCart={product_is_in_cart}
              onClick={(e) => {
                e.preventDefault();
                if (!isDownModule && attributes) {
                  if (unique && product_is_in_cart) {
                  } else {
                    handleAddToCart(
                      product_selected,
                      addItem,
                      dispatch,
                      quantity_to_buy
                    );
                  }
                } else {
                  handleDown();
                }
                if (!attributes) {
                  if (unique && product_is_in_cart) {
                  } else {
                    handleAddToCart();
                  }
                }
              }}
            />
          )
        ) : (
          <div className="paragrphe-porduct-indisponible-mobile-wrapper">
            <p>Cet article est actuellement indisponible</p>
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
              handleDown();
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
