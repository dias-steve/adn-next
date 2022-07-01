import React from "react";



import ProductVariationForm from "./ProductVariationForm";
import {  useSelector} from 'react-redux';

const mapState = (state) =>({
  product: state.product
})
export default function ProductFormMobile({


}) {


  const {product} = useSelector(mapState)
  const {product_is_variable, is_in_stock_product} = product

  return (
    <div className="product-form-mobile">


      <div className="from-product-wrapper">
        {is_in_stock_product ? (
          <div className={`form-ajouter-panier-content  `}>
            <form>
              {product_is_variable && (
                <ProductVariationForm/>
              )}
            </form>
          </div>
        ) : (
          <div className="form-ajouter-panier-content">
            <p> Cet article est undisponible actuellement </p>
          </div>
        )}
      </div>
    </div>
  );
}
