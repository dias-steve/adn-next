import React from 'react'
import ProductCard from './ProductCard';
import {v4 as uuidv4} from 'uuid';

export default function ProductList({productsListData}) {
    console.log('[PRODUITLIST]')
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
                   <ProductCard key = {uuidv4()} productData={product}/>
               ))}
           </div>
        :<p> Aucun produit n'est diponible actuellement</p>}
    </div>

  )
}
