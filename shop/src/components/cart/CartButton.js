import React from "react";
import { useDispatch } from "react-redux";
import { openCart } from "./cart.actions";

const CartButton = ({ count }) => {
  const dispatch = useDispatch();

  return (
    <a
      className="CartButton"
      role="button"
      href="/cart"
      onClick={e => {
        e.preventDefault();
        dispatch(openCart());
      }}
    >
      <i className="material-icons left">shopping_cart</i> ({count})
    </a>
  );
};

export default CartButton;
