import React, { useState } from "react";
import {
  getAttributVariationsTable,
  getproductObjectbyVariation,
  productInStock,
  getproductObjectbyVariationV2,
} from "../utils/product.utils";
import SelectForm from "./form/FormSelect";

import { v4 as uuidv4 } from "uuid";
import ButtonAjouterPanier from "./ButtonAjouterPanier";
import FormRadio from "./form/FormRadio";
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

export default function ProductForm({ data }) {
  const { id, title, price, childrens } = data;
  const [priceProduct, setPrice] = useState(price);
  const [idProduct, setIdProduct] = useState(id);

  const attributes =
    Array.isArray(childrens) && childrens.length > 0
      ? getAttributVariationsTable(childrens)
      : null;
  const [variationsSelected, setvariationsSelected] = useState(
    attributes ? createInitialState(attributes) : null
  );
  const childSelected = attributes
    ? getproductObjectbyVariationV2(variationsSelected, childrens)
    : null;
  const inStock = childSelected
    ? childSelected.cleanResult & (childSelected.price !== "")
      ? true
      : false
    : productInStock(data) & (price !== "");

  console.log(childSelected);

  //const variations = [{attribute_slug: 'attribute_pa_size',attribute_value:'small' }, {attribute_slug: 'attribute_couleur',attribute_value:'Red' }]
  //console.log(getproductObjectbyVariation(variations, childrens));

  return (
    <div className="productform-container">
      <div className="product-title-price-wrapper">
      <h1 className="product-title">{title}</h1>

      <p className="product-price">
        {attributes ? childSelected.price : priceProduct}€
      </p>
      </div>


      <div className="from-product-wrapper">
        {inStock ? (
          <div className="form-ajouter-panier-content">
            <form>
            {attributes && 

              <div className="form-parameter-product">
              {attributes.map((attribute) => (
                <FormRadio  key={uuidv4()}
                handleOptionChange={(e) => {
                  setvariationsSelected({
                    ...variationsSelected,
                    [attribute.attribute_slug]: e.target.value,
                  });
                  
                }} 
                selectedOption = {variationsSelected[attribute.attribute_slug] }
                options={attribute.variations}
                name={attribute.attribute_name}
                />
 
              ))}
              </div>}
              
            <ButtonAjouterPanier />
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
