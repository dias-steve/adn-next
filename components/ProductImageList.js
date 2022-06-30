import React from "react";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";
import {v4 as uuidv4} from 'uuid';

const ListImages = ({listImages}) => {
  let haveImages = false;
  if ((Array.isArray(listImages)) && (listImages.length>0) ) {
    haveImages = true;
  }
  return (
    <div className="listimages-container">
     {haveImages&& listImages.map((image) =>(
       <div key = {uuidv4()} className="ListImages-Item-wrapper image-wrapper">
         <Image src={image} layout={"fill"} className={"image"}/>
       </div>
     ))}
    </div>
  )
}
export default function ProductImageList({ data }) {
  const images = data.images;
  const imagePrincipale = data.thumnail;
  
  const description = data.description;

  return (
    <div className="product-images-list">
  
        
        
        <div className="image-wrapper image-wrapper-principal">
          <Image src={imagePrincipale} layout="fill" className={"image"} />

        </div>
    
      <div className="description-wrapper">
        <h2 className="description-product">{ReactHtmlParser(description)}</h2>
      </div>
      <ListImages listImages={images}/>
    </div>
  );
}
