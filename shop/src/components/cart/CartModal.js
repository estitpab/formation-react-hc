import React from "react";
import cx from "classnames";
import debounce from "lodash.debounce";

import "./CartModal.scss";

import { useSelector, useDispatch } from "react-redux";
import { closeCart, addToCart } from "./cart.actions";
import { computeCartCount } from "./cart.utils";

const CartModal = () => {
  const cart = useSelector(state => state.cart.cart.result);
  const isOpen = useSelector(state => state.cart.isOpen);
  const cartCount = useSelector(state => state.cart.cartCount);
  const cartPrice = useSelector(state => state.cart.cartPrice);
  const dispatch = useDispatch();

  if (!cart) {
    return null;
  }

  return (
    <div className={cx("CartModal", { open: isOpen })}>
      <div className="modal">
        <div className="modal-content">
          <h3 className="header">Your cart ({computeCartCount(cart)})</h3>

          <table className="striped">
            <thead>
              <tr>
                <th colSpan={2}>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ product, qty }) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt=""
                      className="circle"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                  </td>
                  <td>{product.price} €</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={qty}
                      onChange={e => {
                        const difqty = e.target.value - qty;
                        dispatch(addToCart(product.id, difqty));
                      }}
                    />
                    <button
                      className="btn-flat"
                      onClick={e => dispatch(addToCart(product.id, -qty))}
                    >
                      <i className="material-icons">remove_shopping_cart</i>
                    </button>
                  </td>
                  <td>{product.price * qty} €</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>&nbsp;</td>
                <td>{cartCount}</td>
                <td>
                  <strong>
                    {cartPrice}
                     €
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="modal-overlay"
        onClick={() => dispatch(closeCart())}
      ></div>
    </div>
  );
};

export default CartModal;
