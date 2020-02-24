import React from "react";
import ProductItem from "./ProductItem";
import { render, fireEvent } from "@testing-library/react";
import { initStore } from "../../lib/store";
import { Provider } from "react-redux";

const mockFn = jest.fn();

jest.mock("../../lib/api", () => ({
  addToCart: async (productId, qty) => {
    mockFn(productId, qty);
  }
}));

test("ProductItem", () => {
  const product = {
    id: "id",
    image: "image",
    title: "title",
    price: 42
  };

  const store = initStore();

  const element = (
    <Provider store={store}>
      <ProductItem product={product} />
    </Provider>
  );
  const wrapper = render(element);
  // console.log(wrapper);

  expect(wrapper.container).toMatchSnapshot();

  const addShoppingCart = wrapper.getByText("add_shopping_cart");
  expect(addShoppingCart).toBeDefined();

  fireEvent.click(addShoppingCart);
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith("id", 1);
});
