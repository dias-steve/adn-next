

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

//Reducers
import modalReducer from "./Modal/modal.reducer";
import orderReducer from "./Order/order.reducer";
import productReducer from "./Product/product.reducer";
import imageViewerReducer from './ImageViewer/imageViewer.reducer'
import menuReducer from './Menu/menu.reducer';


export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    product: productReducer,
    imageviewer: imageViewerReducer,
    menu: menuReducer
});

const configStorage = {
    key: 'root',
    storage,
    blacklist: ['modal', 'order', 'product',' imageviewer','menu'],

}

export default persistReducer(configStorage, rootReducer);
