import productTypes from './product.types';

export const setVariationsSelected = variations => ({
    type: productTypes.SET_VARIATIONS_SELECTED,
    payload: variations
});

export const setProductSelected = product => ({
    type: productTypes.SET_PRODUCT_SELECTED,
    payload: product
});

export const setIsInStockProduct = isInStock => ({
    type: productTypes.SET_IS_IN_STOCK_PRODUCT,
    payload: isInStock
});

export const setRawProductData = rawData => ({
    type: productTypes.SET_RAW_PRODUCT_DATA,
    payload: rawData
})

export const setIsInCartProduct = isInCartProduct => ({
    type: productTypes.SET_IS_IN_THE_CART_PRODUCT,
    payload: isInCartProduct
})

export const setListVariations = listVariations => ({
    type: productTypes.SET_LIST_VARIATIONS,
    payload: listVariations
})

export const setProductIsVariable = productIsVariable => ({
    type: productTypes.SET_PRODUCT_IS_VARIABLE,
    payload: productIsVariable
})

export const setProductIsIndividual = isIndividual => ({
    type: productTypes.SET_PRODUCT_IS_INDIVIDUAL,
    payload: isIndividual
})

export const setProductGalleryImages = images => ({
    type: productTypes.SET_PRODUCT_GALLERY_IMAGE,
    payload: images
})