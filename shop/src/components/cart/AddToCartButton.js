import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cart.actions";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();

  const clickHandler = event => {
    event.preventDefault();
    dispatch(addToCart(productId, 1));
  };

  return (
    <button
      onClick={clickHandler}
      className="btn-floating btn-large halfway-fab waves-effect waves-light red"
    >
      <i className="material-icons">add_shopping_cart</i>
    </button>
  );
};

export default AddToCartButton;
