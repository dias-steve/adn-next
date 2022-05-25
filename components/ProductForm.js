import React from "react";




import { v4 as uuidv4 } from "uuid";
import ButtonAjouterPanier from "./ButtonAjouterPanier";
import FormRadio from "./form/FormRadio";





export default function ProductForm({ data , isDownModule, inStock, setvariationsSelected, childSelected, attributes, variationsSelected, handleAddToCart}) {
  const { id, title, price} = data;
  


/**BEGIN SHOW ADD Panier conditional */


  
  return (
    <div className="productform-container">
      <div className={`product-title-price-wrapper `}>

      <div className={`product-title-wrapper`}>
        <h1 className={`product-title `}>{title}</h1>
      </div>
      
      <div className="product-price-wrapper">
        
      <p className="product-price">
      {attributes && inStock ?  childSelected.price + (childSelected.price !== "" ? '€': ''): price + (price !== "" ? '€': '') }
      </p>
      
     
      </div>
      </div>


      <div className="from-product-wrapper">
        {inStock ? (
          <div className={`form-ajouter-panier-content  `}>
            <form className="form-part">
            {attributes && 
              
              <div className={`form-parameter-product `}>
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
              handleAddToCart()
              
              }} />
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
