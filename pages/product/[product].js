import React, { useRef, useState, useEffect } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import ProductForm from "../../components/ProductForm";
import ProductImageList from "../../components/ProductImageList";

import { v4 as uuidv4 } from "uuid";
import { useCart } from "react-use-cart";

import { initialiseProduct, actualiseProductIsInCartToStore } from "../../utils/product.utils";


import ProductList from "../../components/ProductList";
import DetailCompositionProduct from "../../components/DetailCompositionProduct";

//redux

import { useDispatch, useSelector } from "react-redux";
import ProductBaseMobile from "../../components/ProductBaseMobile";

const mapState = (state) => ({
  product: state.product,
});

export default function Product(props) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const productzoneRef = useRef();
  const onScreen = useOnScreen(formRef, 0, "0px");
  const onScreenProductLook = useOnScreen(productzoneRef, 0, "0px");

  const infoBuild = props.product.info_build;
  const { inCart, items } = useCart();
  const { product } = useSelector(mapState);
  const { product_selected } = product;

  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    initialiseProduct(props.product, dispatch);
  }, []);

  const productLookList =
    Array.isArray(props.product.product_look_list) &&
    props.product.product_look_list.length > 0
      ? props.product.product_look_list
      : null;

  useEffect(() => {
    actualiseProductIsInCartToStore(inCart, product_selected.id, dispatch) 
  }, [product_selected, itemInCart, items]);

  return (
    <div className="page-product-style-container">
      <ProductBaseMobile onScreenProductLook={onScreenProductLook} />

      <div className="global-container">
        <div
          ref={formRef}
          className="product-description-container content-container"
        >
          <div className="grid-wrapper">
            <div className="left-container">
              <ProductImageList data={props.product} />

              <DetailCompositionProduct data={infoBuild} />
            </div>
            <div
              className={`right-container ${
                onScreen
                  ? " right-container-fixed"
                  : " right-container-notfixed"
              }`}
            >
              <ProductForm />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "10vh" }} className="space" />
      <div ref={productzoneRef} className="global-container">
        {productLookList && (
          <div className=" produit-look-container content-container">
            <h2 className="porductLookList-title">A porter avec</h2>
            <ProductList
              productsListData={productLookList}
              baseLink={"/product/"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.product;

  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products/" + id
  );
  const product = await data.json();

  return {
    props: {
      product,
      key: uuidv4(),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products"
  );

  const products = await data.json();

  // on dit le chemin pour chaque articles
  const paths = products.map((item) => ({
    params: { product: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
