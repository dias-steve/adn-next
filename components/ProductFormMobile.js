import React from "react";
import { v4 as uuidv4 } from "uuid";

import FormRadio from "./form/FormRadio";
export default function ProductFormMobile({
  data,
  isDownModule,
  inStock,
  setvariationsSelected,
  childSelected,
  attributes,
  variationsSelected,
}) {
  const { id, title, price } = data;
  return (
    <div className="product-form-mobile">


      <div className="from-product-wrapper">
        {inStock ? (
          <div className={`form-ajouter-panier-content  `}>
            <form>
              {attributes && (
                <div className={`form-parameter-product `}>
                  {attributes.map((attribute) => (
                    <FormRadio
                      key={uuidv4()}
                      handleOptionChange={(e) => {
                        setvariationsSelected({
                          ...variationsSelected,
                          [attribute.attribute_slug]: e.target.value,
                        });
                      }}
                      selectedOption={
                        variationsSelected[attribute.attribute_slug]
                      }
                      options={attribute.variations}
                      name={attribute.attribute_name}
                    />
                  ))}
                </div>
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
