import React from 'react'
import ProductCard from './ProductCard';
import {v4 as uuidv4} from 'uuid';

export default function ProductList({productsListData, baseLink}) {

    console.log(productsListData)
    const productsList = productsListData;
    let haveProduct = false;
    if(Array.isArray(productsList) && productsList.length > 0) {
        haveProduct = true;
    }
  return (
    <div className="productsList content-container">
        {haveProduct ? 
           <div className="productsList-content">
               {productsList.map( product => (
                   <ProductCard key = {uuidv4()} productData={product} baseLink={baseLink}/>
               ))}
           </div>
        :<p> Aucun produit diponible actuellement</p>}
    </div>
  )
}
