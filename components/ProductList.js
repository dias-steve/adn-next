import React from 'react'
import ProductCard from './ProductCard';
import {v4 as uuidv4} from 'uuid';
import BtnNextPrev from './BtnNextPrev/BtnNextPrev';


   export const btnNext = () => {
        return (
            <div className='btn-wrapper btn-next'>
                   <span> next</span>
            </div>
     
        )
    }
    
   export const btnPrev = () => {
        return (
        <div className='btn-wrapper btn-prev'>
        <span> prev</span>
        </div>
        )
    }

export default function ProductList({productsListData, baseLink, inSlider}) {



    console.log(productsListData)
    const productsList = productsListData;
    let haveProduct = false;
    if(Array.isArray(productsList) && productsList.length > 0) {
        haveProduct = true;
    }
  // TODO: add btn next / prev
  return (


    <div className={`productsList  ${
        inSlider ? 'allWitdh': 'content-container '
    }
    `}>
        {false && 
        <>
        <div className={'list-product-btn-wrapper btn-prev'}>
        < BtnNextPrev
        isLeft = {true}
        handleOnClick= {() => {}}
        
        />
        </div>
        <div className={'list-product-btn-wrapper btn-next'}>
          < BtnNextPrev
        isLeft = {false}
        handleOnClick= {() => {}}
        
        />
           </div>
        </>}
        {haveProduct ? 
           <div className="productsList-content">
               {productsList.map( product => (
                    
                   <ProductCard key = {uuidv4()} productData={product} baseLink={baseLink} forSlider={true}/>
                 
               ))}
           </div>
        :<p> Aucun produit diponible actuellement</p>}
    </div>
  )
}
