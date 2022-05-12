import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({ productData }) {
  const { image_product, title, id } = productData;
  return (
    <div className="product-card-conatainer ">
      <div className="product-card-img-wrapper">
        <Link href={`products/${id}`}>
          <a>
            <Image src={image_product} layout="fill" className={"image"} />
          </a>
        </Link>
      </div>
      <div className="product-card-title-wrapper">
      <h2 className="product-card-title">{title}</h2>
      </div>
      
    </div>
  );
}
