import React from 'react'

export default function product(props) {
    const {id, title} = props.product
  return (
    <div className='page-product-style-container'>
        <h1>{title}</h1>
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