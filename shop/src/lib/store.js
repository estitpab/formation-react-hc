import { createStore, applyMiddleware, compose } from "redux";
import { reducer, initialState as defaultInitialState } from "./reducer";
import { getCart } from "./api";
import {
  getCartStart,
  getCartSuccess,
  getCartError
} from "../components/cart/cart.actions";

const pendingActions = {};
const setPageLoading = store => next => action => {
  /* Exemple d'effet de bord: injecter dans l'action des données d'autres parties du store
  // store.getState()
  if (action.type === 'CART_…') {
    action.meta.categories = store.getState().app.categories
    next(action)
  }
  */

  if (action?.type?.match(/_START$/)) {
    pendingActions[action.type.replace(/_START$/, "")] = true;
  }
  if (action?.type?.match(/_(SUCCESS|ERROR)$/)) {
    delete pendingActions[action.type.replace(/_(SUCCESS|ERROR)$/, "")];
  }
  if (Object.keys(pendingActions).length > 0) {
    document.title = "(...) " + document.title.replace(/^\(\.\.\.\) /, "");
  } else {
    document.title = document.title.replace(/^\(\.\.\.\) /, "");
  }

  next(action);
};

// npm add redux-thunk
const thunkMiddleware = store => next => action => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

export const initStore = (initialState = defaultInitialState) => {
  const middlewares = [setPageLoading, thunkMiddleware];

  // Wrapper to enable Redux Devtools
  // https://github.com/zalmoxisus/redux-devtools-extension#usage
  const composeEnhancers =
    process.env.NODE_ENV !== "production" && // not in production
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  // Apply middlewares
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  // Initialize store with global reducer, global initial state, and enhanced middlewares
  return createStore(reducer, initialState, enhancer);
};
