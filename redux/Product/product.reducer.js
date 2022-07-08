import productTypes from "./product.types";

export const INITIAL_STATE = {
  variations_selected: {},
  product_selected: {
    id_parent: 0,
    id: 0,
    name: "",
    price: "",
    stock_status: "",
    img: "",
    unique: false,
    idlink: 0,
    thumnail: {
      url:"",
      alt:""
    }
  },
  is_in_stock_product: false,
  raw_product_data: {},
  product_is_in_cart: false,
  quantity_to_buy: 1,
  list_variations: [],
  product_is_variable: false,
  product_is_individual: false,
  product_gallery_images: [
    {
      url: null,
      alt: null
    }
  ],

  product_presentation_video: {
    url:null,
    alt:null
  }
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

    case productTypes.SET_IS_IN_STOCK_PRODUCT:
      return {
        ...state,
        is_in_stock_product: action.payload,
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
      };
    case productTypes.SET_LIST_VARIATIONS:
      return {
        ...state,
        list_variations: action.payload,
      };
    case productTypes.SET_PRODUCT_IS_VARIABLE:
      return {
        ...state,
        product_is_variable: action.payload,
      };
    case productTypes.SET_PRODUCT_IS_INDIVIDUAL:
      return {
        ...state,
        product_is_individual: action.payload,
      };
    case productTypes.SET_PRODUCT_GALLERY_IMAGE:
      return {
        ...state,
        product_gallery_images: action.payload,
      }
    case productTypes.SET_PRODUCT_VIDEO_PRESENTATION:
      return {
        ...state,
        product_presentation_video: action.payload,
      }
    default:
      return state;
  }
};

export default productReducer;
