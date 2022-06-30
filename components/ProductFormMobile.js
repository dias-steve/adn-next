import React from "react";
import { v4 as uuidv4 } from "uuid";

import FormRadio from "./form/FormRadio";
import ProductVariationForm from "./ProductVariationForm";
import { useDispatch, useSelector} from 'react-redux';

const mapState = (state) =>({
  product: state.product
})
export default function ProductFormMobile({


}) {

  const dispatch = useDispatch()
  const {product} = useSelector(mapState)
  const {attributes, is_in_stock_product} = product

  return (
    <div className="product-form-mobile">


      <div className="from-product-wrapper">
        {is_in_stock_product ? (
          <div className={`form-ajouter-panier-content  `}>
            <form>
              {attributes && (
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
