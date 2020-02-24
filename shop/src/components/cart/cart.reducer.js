import { computeCartCount, computeCartPrice } from "./cart.utils";

export const initialState = {
  isOpen: false,
  cart: {
    loading: false,
    result: null,
    error: null
  },
  cartCount: 0,
  cartPrice: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_START":
      return {
        ...state,
        cart: {
          loading: true,
          result: null,
          error: null
        },
        cartPrice: 0,
        cartCount: 0
      };
    case "ADD_TO_CART_SUCCESS":
    case "GET_CART_SUCCESS":
      return {
        ...state,
        cart: {
          loading: false,
          error: null,
          result: action.payload.result
        },
        cartPrice: computeCartPrice(action.payload.result),
        cartCount: computeCartCount(action.payload.result)
      };

    case "ADD_TO_CART_ERROR":
    case "GET_CART_ERROR":
      return {
        ...state,
        cart: { loading: false, error: action.error, result: null },
        cartPrice: 0,
        cartCount: 0
      };

    default:
      return state;
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OPEN_CART":
      // Immutable.js:
      // return state.set('isOpen', action.payload.isOpen)
      return {
        ...state,
        isOpen: action.payload.isOpen
      };

    default:
      return cartReducer(state, action);
  }
};
