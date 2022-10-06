import rgpdTypes from './rgpd.types.js';

export const INITIAL_STATE = {
    is_accepted: false,
}

const rgpdReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case rgpdTypes.SET_IS_ACCEPTED:
            return {...state,
            is_accepted: action.payload
            };
        default: 
            return state;
    }
} 

export default rgpdReducer;