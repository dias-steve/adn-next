import { handleSetConfigModal, handleSetShowModal } from "./modal.utils";

//redux
import {
  setIsInStockProduct,
  setProductSelected,
  setVariationsSelected,
  setRawProductData,
  setListVariations,
  setProductIsVariable,
  setProductIsIndividual,
  setIsInCartProduct,
  setProductGalleryImages,
  setProductPresentationVideo,
  setMultiPrice,
  setOnSale
} from "./../redux/Product/product.actions";

//contant value
export const PRODUCT_ALREADY_IN_CART_MESSAGE = 'Cet article est unique.<br /> Il a bien été ajouté dans votre panier.'
export const PRODUCT_OUT_OF_STOCK_MESSAGE = 'Cet article est actuellement indisponible.'


export function getproductObjectbyVariationV2(
  variationsSelected,
  childrensProduct
) {
  let good = childrensProduct;
  const variations = Object.keys(variationsSelected);
  for (let i = 0; i < variations.length; i++) {
    good = good.filter((child) =>
      filterVariation(child, variations[i], variationsSelected[variations[i]])
    );
  }
  return { ...good[0], cleanResult: good.length === 1 ? true : false };
}

export function getChildrensByVariation(
  variationsSelected,
  childrensProduct
) {
  console.log(childrensProduct)
  let goods = childrensProduct;
  const variations = Object.keys(variationsSelected);
  for (let i = 0; i < variations.length; i++) {
    goods = goods.filter((child) =>
      filterVariation(child, variations[i], variationsSelected[variations[i]])
    );
  }
  return goods;
}


export function getListTermeAvaibleWitheVariationSelected(childrens,variationNameFor, variationSelected ){


  const{[variationNameFor]: valuedelete ,...variationsSelectedWithouVariationFor }= variationSelected

  const childrensfiltred = getChildrensByVariation(variationsSelectedWithouVariationFor, childrens ) 
  let termesObject = {}
  childrensfiltred.forEach(child => {
    const terme = child.variation_name[variationNameFor]
      if(child.stock_status==='instock'){
         termesObject = {...termesObject, [terme] : true }
        
      }else{
       termesObject = {...termesObject, [terme] : false }
      }
  
    });
  return termesObject;

}
export function filterVariation(child, variationName, variationValue) {
  if (child.variation_name[variationName] === variationValue) {
    return true;
  }
  return false;
}

export function getAvaibleIf(child, variationName, variationValue) {
  
}
export function filterinstockChildren(child) {
  if (child.stock_status === "instock" && child.price !== "") {
    return true;
  }
}

export function productInStock(product) {
  if (Array.isArray(product.childrens) && product.childrens.length > 0) {
    for (let i = 0; i < product.childrens.length; i++) {
      if (product.childrens[i].stock_status === "instock") {
        return true;
      }
    }
  }
  if (product.stock_status == "instock") {
    return true;
  }
  return false;
}

export const createInitialStateV2 = (listVariations) => {
  if (listVariations) {
    let initialstate = {};
    for (let i = 0; i < listVariations.length; i++) {
      initialstate = {
        ...initialstate,
        [listVariations[i].variation_key]: listVariations[i].termes.termes_in_stock[0],
      };
    }
    return initialstate;
  } else {
    return null;
  }
};

export const getProductSelectedV2 = (
  productIsVariable,
  varaiationValueSelected,
  productChildrens,
  productByDefault,
  idParentProduct,
  thumnail,
  product_is_individual,
  idLink
) => {
  
  if (productIsVariable) {
    const productSelected = getproductObjectbyVariationV2(
      varaiationValueSelected,
      productChildrens
    );
    if (productSelected.cleanResult && productSelected.price !== "") {
     
      return {
        ...getproductObjectbyVariationV2(
          varaiationValueSelected,
          productChildrens
        ),
        id_parent: idParentProduct,
        product_is_individual: product_is_individual,
        idlink: idLink,
      };
    } else {
      return {
        ...productByDefault,
        stock_status: "outofstock",
        cleanResult: false,
      };
    }
  } else {
    return { ...productByDefault, cleanResult: true };
  }
};

export const handleAddToCart = (product, addItem, dispatch, quantity) => {
  if(product.stock_status === 'instock'){
    handleSetConfigModal(
      {
        is_loading: false,
        title: "Le produit " + product.name + " a bien été ajouté dans le panier",
        message: "",
        is_positif: true,
      },
      dispatch
    );
    setTimeout(() => {
      handleSetShowModal(false, dispatch);
    }, 2000);
    console.log('[DEV >>>>>>>>>>> product.utils > handleAddtoCart 168> Product]')
    console.log(product)
    addItem(product, quantity);
  }else{

    handleSetConfigModal(
      {
        is_loading: false,
        title: "Veuillez sectionner tous les paramètres cet articles",
        message: "Cet article n&#39;a pas été ajouté dans votre panier",
        is_positif: false,
      },
      dispatch
    );
  }



};

export const createProductByDefault = (rawProduct) => {
  const productByDefault = {
    id_parent: rawProduct.id,
    id: rawProduct.id,
    name: rawProduct.title,
    price: rawProduct.price,
    stock_status: rawProduct.stock_status,
    thumnail: rawProduct.thumnail,
    product_is_individual: rawProduct.product_is_individual,
    idlink: rawProduct.id,
    on_sale: rawProduct.on_sale,
    regular_price: rawProduct.regular_price,
    shipping_cost_unit: rawProduct.shipping_cost_unit,
    free_shippement : rawProduct.free_shippement
  };
  return productByDefault;
};


export const initialiseProduct = async (rawProduct, dispatch) => {
  const productByDefault = await createProductByDefault(rawProduct);
  const initialVariationSelected = await createInitialStateV2(rawProduct.list_variations);
  const productSelected = await getProductSelectedV2(
    rawProduct.product_is_variable,
    initialVariationSelected,
    rawProduct.childrens,
    productByDefault,
    rawProduct.id,
    rawProduct.thumnail,
    rawProduct.product_is_individual,
    rawProduct.id
  );


  dispatch(setRawProductData(rawProduct));

  dispatch(setListVariations(rawProduct.list_variations));

  dispatch(setVariationsSelected(initialVariationSelected));

  dispatch(setProductSelected(productSelected));

  dispatch(setIsInStockProduct(rawProduct.product_is_in_stock));

  dispatch(setProductIsVariable(rawProduct.product_is_variable));

  dispatch(setProductIsIndividual(rawProduct.product_is_individual));

  dispatch(setProductGalleryImages(rawProduct.images));
  dispatch(setProductPresentationVideo(rawProduct.video));
  dispatch(setMultiPrice(rawProduct.multi_price));
  dispatch(setOnSale(rawProduct.on_sale));
};

export const handleSetProductSelected = async (
  valueVariationsSelected,
  rawProduct,
  dispatch
) => {
  const productIsVariable= rawProduct.product_is_variable;
  const productByDefault = await createProductByDefault(rawProduct);
  const productSelected = await getProductSelectedV2(
    productIsVariable,
    valueVariationsSelected,
    rawProduct.childrens,
    productByDefault,
    rawProduct.id,
    rawProduct.thumnail,
    rawProduct.product_is_individual,
    rawProduct.id
  );
  dispatch(setVariationsSelected(valueVariationsSelected));
  dispatch(setProductSelected(productSelected));
};

export const actualiseProductIsInCartToStore = (inCartTest, productId,dispatch) => {
  if (inCartTest(productId)) {
    dispatch(
      setIsInCartProduct(true)
    )
  } else {
    dispatch(
      setIsInCartProduct(false)
    )
  }
}

export const getFirstchildInStock = (childrens) => {

}

