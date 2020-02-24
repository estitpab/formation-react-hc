import React from "react";
import ProductItem from "./ProductItem";
import { getProducts } from "../../lib/api";
import useAsync from "../../lib/useAsync";
import { useSelector } from "react-redux";

// Mise à jour React
// Caca du plugin jQuery

// Nettoyage du caca
// Mise à jour
// Re-caca

/*
class ProductList extends React.Component {
  state = { products: null, loading: true, error: null }

  loadProducts() {
    getProducts(this.props.category)
      .then(products => this.setState({ loading: false, products }))
      .catch(error => this.setState({ loading: false, error }))
  }

  componentDidMount() {
    loadProducts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ products: null, loading: true, error: null });
      loadProducts();
    }
  }

  render() {
    const { products, loading, error } = this.state
    ...
  }
}
*/

const ProductList = () => {
  const category = useSelector(state => state.app.currentCategory);
  console.log({ category });
  const asyncFunction = React.useCallback(() => getProducts(category), [
    category
  ]);
  const [error, loading, products] = useAsync(asyncFunction);

  console.log({ raceCondition: category !== products?.[0]?.category });

  return (
    <div className="ProductList row">
      {loading && <p>Loading…</p>}
      {error && (
        <p>
          Error: <strong>{error.message}</strong>
        </p>
      )}
      {products &&
        products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
