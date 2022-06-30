import product from "../pages/product/[product]";
import { handleSetConfigModal, handleSetShowModal } from "./modal.utils";
import { setAttributes, setIsInStockProduct, setProductSelected, setVariationsSelected, setRawProductData} from "./../redux/Product/product.actions"
import { a } from "react-spring";

export  function getAllAtributes (childrens) {
  if (childrens[0].variation_name) {
    
    return Object.keys(childrens[0].variation_name);
  } else {
    return null;
  }
};

export  function getAllAvailableVariation (childrens, variationName) {
  const variationAvailable = Array();
  childrens
    .filter((child) => filterinstockChildren(child))
    .map((child) => {
      const name = child.variation_name[variationName];
      if (variationAvailable.indexOf(name) === -1) {
        variationAvailable.push(name);
      }
    });

  return variationAvailable;
};

export function getAttributesName (attribute) {
  return attribute.split("_").pop().replace("-", " ");
};

export const getproductObjectbyVariation = (variations, childrensProduct) => {
  let good = childrensProduct;
  for (let i = 0; i < variations.length; i++) {
    good = good.filter((child) =>
      filterVariation(
        child,
        variations[i].attribute_slug,
        variations[i].attribute_value
      )
    );
  }

  return good;
};

export  function getproductObjectbyVariationV2(variationsSelected, childrensProduct) {
  let good = childrensProduct;
  const  variations = Object.keys(variationsSelected)
  for (let i = 0; i < variations.length; i++) {
    good = good.filter((child) =>
      filterVariation(
        child,
        variations[i],
        variationsSelected[variations[i]]
      )
    );
  }
  console.log(good);
  return {...good[0], cleanResult: good.length === 1 ? true : false};
};

export  function filterVariation (child, variationName, variationValue) {
  if (child.variation_name[variationName] === variationValue) {
    return true;
  }
  return false;
};
export function filterinstockChildren(child) {
  if (child.stock_status === "instock" && child.price !== "") {
    return true;
  }
};

export function productInStock (product) {
    if (Array.isArray(product.childrens) && product.childrens.length > 0){
      
        for (let i = 0 ; i < product.childrens.length; i++) {
            if (product.childrens[i].stock_status === 'instock') {
                return true;
            }
        }
    }
    if(product.stock_status =='instock') {
        return true;
    }
    return false;
}

//reformater les attributes sous forme de tableau 
export function getAttributVariationsTable (childrens) {
  const attributes = getAllAtributes(childrens);
  return attributes.map((attribute) => {
    return {
      attribute_slug: attribute,
      attribute_name: getAttributesName(attribute),
      variations: getAllAvailableVariation(childrens, attribute),
    };
  });
};


export function createAttributesTable (productChildrens) {
  return Array.isArray(productChildrens) && productChildrens.length > 0
  ? getAttributVariationsTable(productChildrens)
  : null;
}

//Création d'un disctionnaire attribute avec la valeur de la première variation
export const createInitialState = (attributes) => {
  if(attributes){
    let initialstate = {};
    for (let i = 0; i < attributes.length; i++) {
      initialstate = {
        ...initialstate,
        [attributes[i].attribute_slug]: attributes[i].variations[0],
      };
    }
    return initialstate;
  }else{
    return null
  }

};

export const getProductSelected = (attributes, varaiationValueSelected, productChildrens ) => {
  return attributes
    ? getproductObjectbyVariationV2(varaiationValueSelected, productChildrens)
    : null;
}

export const getProductSelectedV2 = (attributes, varaiationValueSelected, productChildrens, productByDefault, idParentProduct, thumnail, is_unique, idLink) => {
  
  if(attributes){
    const productSelected = getproductObjectbyVariationV2(varaiationValueSelected, productChildrens)
    if( productSelected.cleanResult && productSelected.price !=="" ){
      return {
        ...getproductObjectbyVariationV2(varaiationValueSelected, productChildrens),
        id_parent: idParentProduct,
        img: thumnail,
        unique: is_unique,
        idlink: idLink,

       }
    }else{
      return {...productByDefault, stock_status:"outofstock", cleanResult: false }
    }
    
  }else{
    return {...productByDefault, cleanResult: true} ;
  }
}

export const handleAddToCart = (product, addItem, dispatch, quantity ) => {
  addItem(product, quantity)
  handleSetConfigModal({
    is_loading: false,
    title: 'Le produit '+product.name+ ' a bien été ajouté dans le panier',
    message: "",
    is_positif: true,
  },dispatch)
  setTimeout(() => {
    handleSetShowModal(false, dispatch);
  },2000)
}

export const createProductByDefault = (rawProduct) => {
  const productByDefault = {
    id_parent: rawProduct.id,
    id: rawProduct.id,
    name:rawProduct.title,
    price:rawProduct.price,
    stock_status:rawProduct.stock_status,
    img: rawProduct.thumnail,
    unique: rawProduct.is_unique,
    idlink: rawProduct.id,
  }
  return productByDefault;
}

export const haveProductChildInStock=  (productSelected, rawProduct) => {
  return productSelected
  ? productSelected.cleanResult & (productSelected.price !== "")
    ? true
    : false
  : productInStock(rawProduct) & (price !== rawProduct.price);
}
export const initialiseProduct = async (rawProduct, dispatch) => {
  const productByDefault = await createProductByDefault(rawProduct);
  const attributes = await createAttributesTable(rawProduct.childrens)
  const initialVariationSelected = await createInitialState(attributes)
  const productSelected = await getProductSelectedV2(attributes,initialVariationSelected, rawProduct.childrens, productByDefault, rawProduct.id, rawProduct.thumnail , rawProduct.is_unique, rawProduct.id)
  const IsInStockProduct = await haveProductChildInStock(productSelected, rawProduct)

  dispatch(
    setRawProductData(rawProduct)
  )
  dispatch(
    setAttributes(attributes)
  )
  dispatch(
    setVariationsSelected(initialVariationSelected)
  )

  dispatch(
    setProductSelected(productSelected)
  )

  dispatch(
    setIsInStockProduct(IsInStockProduct)
  )
}

export const handleSetProductSelected = async (valueVariationsSelected, rawProduct, dispatch) => {
  const attributes = await createAttributesTable(rawProduct.childrens)
  const productByDefault = await createProductByDefault(rawProduct);
  const productSelected = await getProductSelectedV2(attributes,valueVariationsSelected, rawProduct.childrens, productByDefault, rawProduct.id, rawProduct.thumnail, rawProduct.is_unique, rawProduct.id  )
  dispatch(
    setVariationsSelected(valueVariationsSelected)
  )
  dispatch(
    setProductSelected(productSelected)
  )
}