import modalTypes from "./modal.types";

export const INITIAL_STATE = {
    config: {
        title: '',
        message:'',
        is_positif:false,
        is_loading:false,
        label_buttom: 'OK',
        go_to_home_action: false,
    },
    show_modal: false,
};

const modalReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case modalTypes.SET_TITLE:
            return {
                ...state,
                title: action.payload
            }

        case modalTypes.SET_CONFIG:
            return {
                ...state,
                config: action.payload
            }

        case modalTypes.SET_SHOW_MODAL:
            return {
                ...state,
                show_modal: action.payload
            }
        
    
        default:
            return state;
    }
}

export default modalReducer;