import orderTypes from "./order.types";

export const INITIAL_STATE = {
    shippement_mode_selected:{
        method_is_not_valid: true,
        method_cost: "0",
        method_is_enbled: true,
        method_rate_id: "",
        method_title: "",
        method_user_title: "Aucun mode de livraison sélectionné",
        methode_description: "<p>Aucun mode de livraison sélectionné</p>\n",
        shipping_cost_calculated: 0
    },
    list_contry_shippement_available: [],
    total_price: 0,
    shippement_data:{
        firstname: "",
        lastname: "",
        address: "",
        postalcode: "",
        departement: "",
        city: "",
        countrycode: "",
        mail:"",
        phone:"",
        name_card: "",
        cgv: false,
        instructions: ''
    },
    shippement_data_validation_state:{
        firstname: true,
        fristname_message:'',
        lastname: true,
        lastname_message:'',
        address: true,
        address_message:'',
        postalcode: true,
        postalcode_message:'',
        departement: true,
        departement_message:'',
        city: true,
        city_message:'',
        countrycode: true,
        countrycode_message:'',
        mail:true,
        mail_message:'',
        phone:true,
        phone_message:'',
        name_card:true,
        name_card_message:'',
        cgv: true,
        cgv_message:'',
        message_error:[]
    },

    list_shippement_available:[],
    list_notvalid_items:[],
    order_session: {done: false}

   
};

const orderReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case orderTypes.SET_SHIPPEMENT_MODE_SELECTED:
            return {
                ...state,
                shippement_mode_selected: action.payload
            }
        case orderTypes.SET_SHIPPEMENT_DATA:
            return {
                ...state,
                shippement_data: action.payload
            }
        case orderTypes.SET_LIST_SHIPPEMENT_AVAILABLE:
            return {
                ...state,
                list_shippement_available: action.payload
            }
        case orderTypes.SET_SHIPPEMENT_DATA_VALIDATION_STATE:
            return {
                ...state,
                shippement_data_validation_state: action.payload
            }
        case orderTypes.SET_TOTAL_PRICE:
            return {
                ...state,
                total_price: action.payload
            }
        case orderTypes.SET_LIST_COUNTRY_SHIPPEMENT_AVAILABLE:
            return{
                ...state,
                list_contry_shippement_available: action.payload
            }
        case orderTypes.SET_LIST_NOT_VALID_ITEMS:
            return{
                ...state,
                list_notvalid_items: action.payload
            }
        case orderTypes.SET_ORDER_SESSION:
            return {
                ...state,
                order_session: action.payload
            }
        default:
            return state;
    }
}

export default orderReducer;