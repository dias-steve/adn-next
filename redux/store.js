
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/reducers";
import { persistStore, persistReducer } from 'redux-persist'


// initial states here
const initalState = {};

// middleware
const middleware = [thunk, logger];

// creating store
export let store = createStore(
  rootReducer,
 applyMiddleware(...middleware)
);

// assigning store to next wrapper
const makeStore = () => store;
export const persistor = persistStore(store)
export const wrapper = createWrapper(makeStore);
export default {
    store,
    persistor,
    wrapper
};
