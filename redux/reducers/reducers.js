import modalReducer from "./modalReducer";
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


export const rootReducer = combineReducers({
    modal: modalReducer

});

const configStorage = {
    key: 'root',
    storage,
    blacklist: ['modal'],

}

export default persistReducer(configStorage, rootReducer);
