import product from "../pages/product/[product]";

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