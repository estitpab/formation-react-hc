import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/app/App";
import { fetchCategories } from "./components/app/app.actions";

import { Provider } from "react-redux";
import { initStore } from "./lib/store";
import { fetchCart } from "./components/cart/cart.actions";

const store = initStore();

// TODO didMount de App?
store.dispatch(fetchCart());
store.dispatch(fetchCategories());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
