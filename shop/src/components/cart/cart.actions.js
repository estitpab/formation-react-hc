import { getCart, addToCart as updateCart } from "../../lib/api";
import { asyncActionCreatorFactory } from "../../lib/action-helpers";

export const openCart = () => ({
  type: "SET_OPEN_CART",
  payload: { isOpen: true }
});

export const closeCart = () => ({
  type: "SET_OPEN_CART",
  payload: { isOpen: false }
});

/*
export const fetchCart = () => dispatch => {
  ....
}
*/

/*
export const fetchCart = () => {
  const action = dispatch => {
    dispatch(getCartStart());
    getCart()
      .then(categories => dispatch(getCartSuccess(categories)))
      .catch(error => dispatch(getCartError(error)));
  };
  return action;
};
*/

export const fetchCart = asyncActionCreatorFactory(getCart, "GET_CART");

/**
 * @param string productId
 * @param number diffQty
 */
export const addToCart = asyncActionCreatorFactory(updateCart, "ADD_TO_CART");

/* version 'redux-axios-middleware'

export const addToCart = (productId, diffQty = +1) => ({
  type: "ADD_TO_CART",
  payload: {
    request: {
      method: "POST",
      url: `/cart/add`,
      body: {
        productId,
        diffQty
      }
    }
  }
});

*/
