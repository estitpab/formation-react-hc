import { combineReducers } from "redux";
import * as app from "../components/app/app.reducer";
import * as cart from "../components/cart/cart.reducer";
// import * as products from '../components/products/products.reducer';

export const initialState = {
  app: app.initialState,
  cart: cart.initialState
};

export const reducer = combineReducers({
  app: app.reducer,
  cart: cart.reducer
});

/*
// List modules here: initialState and rootReducer will be computed from this list
const modules = {
  app,
  cart,
  //products,
};

// Compute exported initialState from reducers' initial states
export const initialState = Object.keys(modules).reduce((state, key) => {
  state[key] = modules[key].initialState; // eslint-disable-line no-param-reassign
  return state;
}, {});

// Combine small reducers to generate the global state and reducer
export const reducer = combineReducers(
  Object.keys(modules).reduce((reducers, key) => {
    reducers[key] = modules[key].reducer; // eslint-disable-line no-param-reassign
    return reducers;
  }, {}),
);
*/
