import footerTypes from './footer.types';

const INITIAL_STATE = {
    is_green_color: false,
}

const footerReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case footerTypes.SET_FOOTER_GREEN:
            return{
                ...state,
                is_green_color: action.payload
            }
        default:
            return state;
    }
}

export default footerReducer;