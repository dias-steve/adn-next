import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({ productData, baseLink }) {
  const { image_product, title, id, on_sale } = productData;
  return (
    <div className="product-card-container ">
      <Link href={`${baseLink}${id}`}>
        <a>
          <div className="product-card-img-container">
          <div className="product-card-img-wrapper">
            {image_product && image_product.url &&
            <Image src={image_product.url} alt={image_product.alt} layout="fill" className={"image"} />
            }
          </div>
          </div>


        </a>
      </Link>
    </div>
  );
}
