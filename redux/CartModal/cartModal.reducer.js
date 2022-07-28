import cartModalTypes from "./cartModal.types";

export const INITIAL_STATE = {
    show_cart_modal: false,
}

const cartModalReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case cartModalTypes.SET_SHOW_CART_MODAL:
            return{
                ...state,
                show_cart_modal: action.payload
            }
        default:
            return state;
    }
}

export default cartModalReducer;