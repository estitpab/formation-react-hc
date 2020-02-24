import memoize from "memoize-one";

export const computeCartCount = memoize(cart =>
  cart.reduce((total, { qty }) => total + qty, 0)
);

export const computeCartPrice = memoize(cart =>
  cart.reduce((total, { product, qty }) => total + product.price * qty, 0)
);
