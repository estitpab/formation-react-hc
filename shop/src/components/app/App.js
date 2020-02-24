import React from "react";

import "./App.scss";

import Nav from "./Nav";
import ProductList from "../products/ProductList";
import CartModal from "../cart/CartModal";

function App() {
  //const [value, setValue] = React.useState("truc");
  return (
    <div className="App">
      {/*
      <form
        style={{ margin: "1em", padding: "1em", border: " 1px solid black" }}
        onSubmit={e => {
          e.preventDefault();
          console.log(e.currentTarget.elements.input1.value);
        }}
      >
        Input non contrôlé :
        <input name="input1" defaultValue="truc" />
        Input contrôlé (readOnly) :
        <input value="truc" readOnly />
        Input contrôlé (onChange) :
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          required
          pattern="truc|bidule"
        />
        <input type="submit" />
      </form>
      <hr />
      */}
      <Nav />
      <main>
        <div className="container">
          <ProductList />
        </div>
        <CartModal />
      </main>
    </div>
  );
}

export default App;
