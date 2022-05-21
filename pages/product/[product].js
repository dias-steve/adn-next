import React, { useRef, useState, useEffect } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import ProductForm from "../../components/ProductForm";
import ProductImageList from "../../components/ProductImageList";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import ButtonAjouterPanier from "../../components/ButtonAjouterPanier";
import ProductFormMobile from "../../components/ProductFormMobile";
import {
  getAttributVariationsTable,
  getproductObjectbyVariation,
  productInStock,
  getproductObjectbyVariationV2,
} from "../../utils/product.utils";

const createInitialState = (attributes) => {
  let initialstate = {};
  for (let i = 0; i < attributes.length; i++) {
    initialstate = {
      ...initialstate,
      [attributes[i].attribute_slug]: attributes[i].variations[0],
    };
  }
  return initialstate;
};

export default function Product(props) {
  const formRef = useRef();
  const onScreen = useOnScreen(formRef, 0, "0px");
  const [isDownModule, setDownModule] = useState(true);
  const { id, title, price, childrens } = props.product;
  const data = props.product;

  /** BEGIN Variables gestion */
  /**BEGIN SHOW ADD Panier conditional */
  const attributes =
    Array.isArray(childrens) && childrens.length > 0
      ? getAttributVariationsTable(childrens)
      : null;
  const [variationsSelected, setvariationsSelected] = useState(
    attributes ? createInitialState(attributes) : null
  );
  const childSelected = attributes
    ? getproductObjectbyVariationV2(variationsSelected, childrens)
    : null;
  const inStock = childSelected
    ? childSelected.cleanResult & (childSelected.price !== "")
      ? true
      : false
    : productInStock(data) & (price !== "");

  console.log(childSelected);

  const productform = {
    inStock,
    variationsSelected,
    setvariationsSelected,
    childSelected,
    attributes,
    isDownModule,
    data,
  };

  /** END Set pro*/

  const handleScroll = () => {
    console.log("scroll");
    setDownModule(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleDown = () => {
    if (!attributes) {
      setDownModule(true);
    }else{
      setDownModule(!isDownModule);
    }
    

    console.log(isDownModule);
  };
  return (
    <div className="page-product-style-container">
      <div
        className={`button-addtocart-mobile-wrapper ${
          isDownModule && attributes
            ? "button-addtocart-mobile-wrapper-down"
            : "button-addtocart-mobile-wrapper-up"
        }`}
      >
        <ButtonAjouterPanier
          onClick={(e) => {
            e.preventDefault();
            if (!isDownModule || !attributes) {
              // add to card
            } else {
              handleDown();
            }
          }}
        />
      </div>

      <div
        className={`button-form-title-price-mobile-wrapper ${
          isDownModule
            ? " button-form-title-price-mobile-wrapper-down "
            : "button-form-title-price-mobile-wrapper-up"
        }`}
      >
        <div
          className={`title-price-mobile-wrapper ${
            isDownModule
              ? "title-price-mobile-wrapper-down"
              : "title-price-mobile-wrapper-up"
          }`}
        >
          <div className={`handle-down`} onClick={()=> {
            handleDown();
          }}/>
          <h1 className="title-mobile">{title}</h1>
          <p className="price-mobile">{attributes ?  childSelected.price: price }€</p>
        </div>
        <ProductFormMobile {...productform} />
      </div>

      <div className="global-container">
        <div
          ref={formRef}
          className="product-description-container content-container"
        >
          <div className="grid-wrapper">
            <div className="left-container">
              <ProductImageList
                data={props.product}
                isDownModule={isDownModule}
              />
            </div>
            <div
              className={`right-container ${
                onScreen
                  ? " right-container-fixed"
                  : " right-container-notfixed"
              }`}
            >
              <div
                className="handle-from"
                onClick={() => {
                  handleDown();
                }}
              />
              <ProductForm
                handle={() => {
                  handleDown();
                }}
                {...productform}
              />
            </div>
          </div>
          <span>fin</span>
        </div>
      </div>

      <div style={{ height: "100vh" }} className="global-container">
        <p> heyhey</p>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.product;

  const data = await fetch(
    process.env.REACT_APP_API_REST_DATA + "/products/" + id
  );
  const product = await data.json();

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch(process.env.REACT_APP_API_REST_DATA + "/products");

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
