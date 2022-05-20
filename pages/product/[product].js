import React, {useRef, useState, useEffect} from "react";
import useOnScreen from "../../hooks/useOnScreen";
import ProductForm from '../../components/ProductForm';
import ProductImageList from '../../components/ProductImageList';
import { useDrag } from 'react-use-gesture';
import {useSpring, animated} from 'react-spring';

export default function Product(props) {
  const formRef = useRef();
  const onScreen = useOnScreen(formRef, 0, "0px");
  const [isDownModule, setDownModule] = useState(true)



  /** BEGIN GESTURE */

 
   /** END GESTURE */
const handleDown= () => {
  setDownModule(!isDownModule);
}
  return (
    <div className='page-product-style-container'>
        <div className="global-container">
          <div ref={formRef}  className="product-description-container content-container">
            <div className="grid-wrapper">
              <div className="left-container">
               
                <ProductImageList data= {props.product} isDownModule={isDownModule}/>
                
              </div>
              <div className={`right-container ${ isDownModule ?'down' :'' } ${onScreen ? 'fixed ':' notfixed'}`} >
                <div className="handle-from" onClick={()=>{
                  handleDown();
                }}/>
                <ProductForm  handle={()=>{handleDown()}} isDownModule={isDownModule} data= {props.product} />
                
              </div>
            </div>
            <span  >fin</span>
          </div>
          
        </div>

        <div style= {{height:"100vh"}}className="global-container">
          <p> heyhey</p>
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