import modalReducer from "./Modal/modal.reducer";
import orderReducer from "./Order/order.reducer"
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer
});

const configStorage = {
    key: 'root',
    storage,
    blacklist: ['modal', 'order'],

}

export default persistReducer(configStorage, rootReducer);
