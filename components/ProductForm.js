import React, { useState, useEffect } from "react";

import { useCurrentWidth } from './../hooks/resizeWindowsHook'
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
import { is } from "@react-spring/shared";


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

export default function ProductForm({ data , isDownModule, handle}) {
  const { id, title, price, childrens } = data;
  const [priceProduct, setPrice] = useState(price);
  const [idProduct, setIdProduct] = useState(id);


/**BEGIN SHOW ADD Panier conditional */
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

  return (
    <div className="productform-container">
      <div className={`product-title-price-wrapper ${isDownModule ? "title-price-wrapper-down": "title-price-wrapper-up"}`}>

      <div className={`product-title-wrapper`}>
        <h1 className={`product-title  ${isDownModule ? "title-down": ""}`}>{title}</h1>
      </div>
      
      <div className="product-price-wrapper">
        
      <p className="product-price">
        {attributes ? childSelected.price : priceProduct}€
      </p>
      
     
      </div>
      </div>


      <div className="from-product-wrapper">
        {inStock ? (
          <div className={`form-ajouter-panier-content  ${ isDownModule ?' down-form-product' :' up-form-product' }`}>
            <form>
            {attributes && 
              
              <div className={`form-parameter-product ${ isDownModule ?' down-parameter-product' :' up-parameter-product' }`}>
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
             
            <ButtonAjouterPanier onClick={(e)=> {
              e.preventDefault()
              handle()}} />
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
