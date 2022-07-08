import React from "react";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";
import {v4 as uuidv4} from 'uuid';
import { useDispatch, useSelector } from "react-redux";


const mapState = (state) => ({
  product: state.product,
});

const ListImages = ({listImages}) => {
  let haveImages = false;
  if ((Array.isArray(listImages)) && (listImages.length>0) ) {
    haveImages = true;
  }
  return (
    <div className="listimages-container">
     {haveImages&& listImages.map((image) =>(
       <div key = {uuidv4()} className="ListImages-Item-wrapper image-wrapper">
        <Image src={image.url} alt={image.alt} layout={"fill"} className={"image"}/>
       </div>
     ))}
    </div>
  )
}
export default function ProductImageList({ data }) {
  const images = data.images;
  const imagePrincipale = data.thumnail
  const description = data.description;

  const { product } = useSelector(mapState);

  return (
    <div className="product-images-list">
  
        
        
        <div className="image-wrapper image-wrapper-principal">
          <Image src={product.product_selected.thumnail.url ? product.product_selected.thumnail.url : imagePrincipale.url } alt= {product.product_selected.thumnail.alt ? product.product_selected.thumnail.alt :  imagePrincipale.alt } layout="fill" className={"image"} />

        </div>
    
      <div className="description-wrapper">
        <h2 className="description-product">{ReactHtmlParser(description)}</h2>
      </div>
      <ListImages listImages={images}/>
    </div>
  );
}
