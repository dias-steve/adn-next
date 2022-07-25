import generalSettingsTypes from './generalSettings.types';

export const INITIAL_STATE = {
    general_settings : {

    }
}

const generalSettingsReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case generalSettingsTypes.SET_GENERAL_SETTINGS:
            return{
                ...state,
                general_settings: action.payload
            }
        default: 
            return state;
    }
}

export default generalSettingsReducer;