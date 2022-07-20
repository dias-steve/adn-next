import menuTypes from "./menu.types";

export const INITIAL_STATE = {
    menu_list: [],
    current_menu: {},
    show_menu: false,
}

const menuReducer = (state=INITIAL_STATE, action) => {
    switch (action.type){
        case menuTypes.SET_CURRENT_MENU:
            return {
                ...state,
                current_menu: action.payload
            };
        case menuTypes.SET_MENU_LIST:
            return {
                ...state,
                menu_list: action.payload
            };
        case menuTypes.SET_SHOW_MENU:
            return {
                ...state,
                show_menu: action.payload
            };
        default: 
            return state;
    }
}
export default menuReducer;