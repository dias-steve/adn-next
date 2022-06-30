import React from "react";

import ButtonAjouterPanier from "./ButtonAjouterPanier";

import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "./../utils/product.utils";
import { useCart } from "react-use-cart";
import ProductVariationForm from "./ProductVariationForm";

const mapState = (state) => ({
  product: state.product,
});

export default function ProductForm() {
  const dispatch = useDispatch();
  const { product } = useSelector(mapState);
  const {
    product_selected,
    raw_product_data,
    attributes,
    is_in_stock_product,
    product_is_in_cart,
    quantity_to_buy,
  } = product;
  const unique = raw_product_data.is_unique;
  const { addItem } = useCart();

  /**BEGIN SHOW ADD Panier conditional */

  return (
    <div className="productform-container">
      <div className={`product-title-price-wrapper `}>
        <div className={`product-title-wrapper`}>
          <h1 className={`product-title `}>{raw_product_data.title}</h1>
        </div>

        <div className="product-price-wrapper">
          <p className="product-price">
            {product_selected.price && product_selected.price + "€"}
          </p>
        </div>
      </div>

      <div className="from-product-wrapper">
        {is_in_stock_product ? (
          <div className={`form-ajouter-panier-content  `}>
            <form className="form-part">
              {attributes && <ProductVariationForm />}
              {!(unique && product_is_in_cart) ? (
                <ButtonAjouterPanier
                  itemInCart={product_is_in_cart}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!(unique && product_is_in_cart)) {
                      handleAddToCart(
                        product_selected,
                        addItem,
                        dispatch,
                        quantity_to_buy
                      );
                    }
                  }}
                />
              ) : (
                <div className="form-ajouter-panier-content">
                  Cet article est unique.
                  <br /> Il a bien été ajouté dans votre panier.
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="form-ajouter-panier-content">
            <p> Cet article est actuellement indisponible </p>
          </div>
        )}
      </div>
    </div>
  );
}
