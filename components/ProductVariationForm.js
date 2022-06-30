import React from "react";




import { v4 as uuidv4 } from "uuid";
import ButtonAjouterPanier from "./ButtonAjouterPanier";
import FormRadio from "./form/FormRadio";
import { useDispatch, useSelector} from 'react-redux';
import {handleSetProductSelected, handleAddToCart} from './../utils/product.utils'
import { useCart } from "react-use-cart";



const mapState = (state) =>({
  product: state.product
})
export default function ProductVariationForm() {
    const dispatch = useDispatch()
    const {product} = useSelector(mapState)
    const {variations_selected, product_selected, raw_product_data, attributes, is_in_stock_product, product_is_in_cart, quantity_to_buy} = product
    const unique = raw_product_data.is_unique
    const { addItem } = useCart();
    
    
  const setvariationsSelected2 = (variationsSelected) =>{
  
    handleSetProductSelected(variationsSelected,product.raw_product_data,dispatch)
    
  }
  return (
    <div className={`form-parameter-product `}>
      {attributes.map((attribute) => (
        <FormRadio
          key={uuidv4()}
          handleOptionChange={(e) => {
            setvariationsSelected2({
              ...variations_selected,
              [attribute.attribute_slug]: e.target.value,
            });
          }}
          selectedOption={variations_selected[attribute.attribute_slug]}
          options={attribute.variations}
          name={attribute.attribute_name}
        />
      ))}
    </div>
  );
}
