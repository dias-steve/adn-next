import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({ productData, baseLink }) {
  const { image_product, title, id,  } = productData;
  return (
    <div className="product-card-container ">
      <Link href={`${baseLink}${id}`}>
        <a>
          <div className="product-card-img-container">
          <div className="product-card-img-wrapper">
            <Image src={image_product.url} alt={image_product.alt} layout="fill" className={"image"} />
          </div>
          </div>

          <div className="product-card-title-wrapper">
            <h2 className="product-card-title">{title}</h2>
          </div>
        </a>
      </Link>
    </div>
  );
}
