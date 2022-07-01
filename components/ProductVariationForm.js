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
    const {list_variations,variations_selected} = product

    
    
  const setvariationsSelected2 = (variationsSelected) =>{
  
    handleSetProductSelected(variationsSelected,product.raw_product_data,dispatch)
    
  }
  return (
    <div className={`form-parameter-product `}>
      {list_variations.map((variation) => (
        <FormRadio
          key={uuidv4()}
          handleOptionChange={(e) => {
            setvariationsSelected2({
              ...variations_selected,
              [variation.variation_key]: e.target.value,
            });
          }}
          selectedOption={variations_selected[variation.variation_key]}
          options={variation.termes.termes_in_stock}
          name={variation.variation_name}
        />
      ))}
    </div>
  );
}
