import productTypes from './product.types';

export const setAttributes = attributes => ({
    type: productTypes.SET_ATTRIBUTES,
    payload: attributes
});

export const setVariationsSelected = variations => ({
    type: productTypes.SET_VARIATIONS_SELECTED,
    payload: variations
});

export const setProductSelected = product => ({
    type: productTypes.SET_PRODUCT_SELECTED,
    payload: product
});

export const setProductPrice = productPrice => ({
    type: productTypes.SET_PRODUCT_PRICE,
    payload: productPrice
});

export const setIsUniqueProduct = isUnique => ({
    type: productTypes.SET_IS_UNIQUE_PRODUCT,
    payload: isUnique
});

export const setIsInStockProduct = isInStock => ({
    type: productTypes.SET_IS_IN_STOCK_PRODUCT,
    payload: isInStock
});

export const setTitleMainProduct = title => ({
    type: productTypes.SET_TITLE_MAIN_PRODUCT,
    payload: title
});

export const setRawProductData = rawData => ({
    type: productTypes.SET_RAW_PRODUCT_DATA,
    payload: rawData
})

export const setIsInCartProduct = isInCartProduct => ({
    type: productTypes.SET_IS_IN_CART_PRODUCT,
    payload: isInCartProduct
})