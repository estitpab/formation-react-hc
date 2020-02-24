import React from "react";
import AddToCartButton from "../cart/AddToCartButton";

const ProductItem = ({ product }) => {
  return (
    <div className="ProductItem col s3">
      <div className="card">
        <div className="card-image">
          <img alt="" src={product.image} />
          <AddToCartButton productId={product.id} />
        </div>
        <div className="card-content">
          <span className="card-title">
            {product.title} ({product.price} €)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
