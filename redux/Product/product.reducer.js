import productTypes from "./product.types";

export const INITIAL_STATE = {
  attributes: [],
  variations_selected: {},
  product_selected: {
    id_parent:0,
    id:0,
    name:"",
    price:"",
    stock_status:"",
    img: "",
    unique:false,
    idlink:0
  },
  product_price: "",
  is_unique_product: false,
  is_in_stock_product: false,
  product_main_title: "",
  product_main_id:"",
  raw_product_data: {},
  product_is_in_cart: false,
  quantity_to_buy: 1,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload,
      };
    case productTypes.SET_VARIATIONS_SELECTED:
      return {
        ...state,
        variations_selected: action.payload,
      };
    case productTypes.SET_PRODUCT_SELECTED:
      return {
        ...state,
        product_selected: action.payload,
      };
    case productTypes.SET_PRODUCT_PRICE:
      return {
        ...state,
        product_price: action.payload,
      };
    case productTypes.SET_IS_UNIQUE_PRODUCT:
      return {
        ...state,
        is_unique_product: action.payload,
      };
    case productTypes.SET_IS_IN_STOCK_PRODUCT:
      return {
        ...state,
        is_in_stock_product: action.payload,
      };
    case productTypes.SET_TITLE_MAIN_PRODUCT:
      return {
        ...state,
        product_main_title: action.payload,
      };

      case productTypes.SET_RAW_PRODUCT_DATA:
        return {
          ...state,
          raw_product_data: action.payload,
        };
      case productTypes.SET_IS_IN_THE_CART_PRODUCT:
        return {
          ...state,
          product_is_in_cart: action.payload,
        }
    default:
      return state;
  }
};

export default productReducer;
