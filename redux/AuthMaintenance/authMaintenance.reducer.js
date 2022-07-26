import menuReducer from "../Menu/menu.reducer";
import authMaintenanceTypes from "./authMaintenace.types"

export const INITIAL_STATE = {
    auth:{
        is_auth: false,
        token: null
    }
}

const authMaintenaceReducer =  (state=INITIAL_STATE, action) => {


    switch (action.type) {
        case authMaintenanceTypes.SET_AUTH:
            return{
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}

export default authMaintenaceReducer;
