import React from 'react';
import ProductForm from '../../components/ProductForm';
import ProductImageList from '../../components/ProductImageList';

export default function product(props) {
    
  return (
    <div className='page-product-style-container'>
        <div className="global-container">
          <div className="product-description-container content-container">
            <div className="grid-wrapper">
              <div className="left-container">
                <ProductImageList data= {props.product}/>
              </div>
              <div className="right-container">
                <ProductForm data= {props.product} />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export async function getStaticProps(context) {
    const id = context.params.product;
  
    const data = await fetch(
      process.env.REACT_APP_API_REST_DATA +"/products/"+id)
    const product = await data.json();
  
    return {
      props: {
        product
      },
    };
  }
  
  export async function getStaticPaths() {
  
    const data = await fetch(process.env.REACT_APP_API_REST_DATA+"/products");
  
    const products = await data.json();
    
    // on dit le chemin pour chaque articles
    const paths = products.map(item => ({
      params: { product: item.id.toString() },
    }));
  
    return {
      paths,
      fallback: false,
    }
  }