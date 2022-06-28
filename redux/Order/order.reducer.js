import orderTypes from "./order.types";

export const INITIAL_STATE = {
    shippement_mode:{},
    total_price: 0,
   
};

const modalReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case orderTypes.SET_SHIPPEMENT_MODE:
            return {
                ...state,
                shippement_mode: action.payload
            }
        default:
            return state;
    }
}

export default modalReducer;