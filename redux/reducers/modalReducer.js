import modalTypes from "../actions/modalTypes";

const INITIAL_STATE = {
    title: '',
    message: '',
    

};

const modalReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case modalTypes.SET_TITLE:
            return {
                ...state,
                title: action.payload
            }
    
        default:
            return state;
    }
}

export default modalReducer;