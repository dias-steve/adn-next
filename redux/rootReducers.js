

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

//Reducers
import modalReducer from "./Modal/modal.reducer";
import orderReducer from "./Order/order.reducer";
import productReducer from "./Product/product.reducer";
import imageViewerReducer from './ImageViewer/imageViewer.reducer'
import menuReducer from './Menu/menu.reducer';
import searchReducer from './Search/search.reducer';
import generalSettingsReducer from './GeneralSettings/generalSettings.reducer';
import authMaintenaceReducer from './AuthMaintenance/authMaintenance.reducer';
import cartModalReducer from './CartModal/cartModal.reducer';
import footerReducer from './Footer/footer.reducer';

export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    product: productReducer,
    imageviewer: imageViewerReducer,
    menu: menuReducer,
    search: searchReducer,
    generalsettings: generalSettingsReducer,
    auth:authMaintenaceReducer,
    cartModal: cartModalReducer,
    footer: footerReducer
});

const configStorage = {
    key: 'root',
    storage,
    blacklist: ['modal', 'order', 'product',' imageviewer','menu', 'search','generalsettings',' cartModal', 'footer'],

}

export default persistReducer(configStorage, rootReducer);
