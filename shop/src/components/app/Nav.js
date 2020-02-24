import React from "react";
import CartButton from "../cart/CartButton";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCategory } from "./app.actions";
import cx from "classnames";
import { computeCartCount } from "../cart/cart.utils";

const titlize = string =>
  string[0].toUpperCase() + string.substring(1).toLowerCase() + "s";

/*
class Nav extends React.Component {
  state = { categories: [], loading: true, error }
  componentDidMount() {
    getCategories()
      .then(categories => this.setState({ loading: false, categories }))
      .catch(error => this.setState({ loading: false, error }))
  }
  render() {
    const { categories, loading, error } = this.state
    ...
  }
}
*/

/*
const mapStateToProps = state => ({
  loading: state.categories.loading,
  categories: state.categories.result,
  error: state.categories.error
})

const Nav = ({ loading, categories, error, count }) => {
  ...
}

export default connect(mapStateToProps)(Nav) // ({ count }) => ...
*/

const Nav = () => {
  // useSelector:
  // 1. useContext() pour aller chercher le store
  // 2. useState() pour pouvoir faire évoluer le composant (valeur initiale = calculée depuis la fonction de sélection)
  // 3. store.subscribe pour mettre à jour le state

  /*
  const { loading, categories, error } = useSelector(state => ({
    loading: state.categories.loading,
    categories: state.categories.result,
    error: state.categories.error
  }));
  */

  const loading = useSelector(state => state.app.categories.loading);
  const categories = useSelector(state => state.app.categories.result);
  const error = useSelector(state => state.app.categories.error);
  const currentCategory = useSelector(state => state.app.currentCategory);
  // const cartCount = useSelector(state => computeCartCount(state.cart.cart.result));
  const cartCount = useSelector(state => state.cart.cartCount);

  const dispatch = useDispatch();

  return (
    <nav className="Nav">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          Bazket
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {categories &&
            categories.map(category => (
              <li
                key={category}
                className={cx({ active: category === currentCategory })}
              >
                <a
                  href={`/category/${category}`}
                  onClick={e => {
                    e.preventDefault();
                    dispatch(setCurrentCategory(category));
                  }}
                >
                  {titlize(category)}
                </a>
              </li>
            ))}
          {loading && null /* TODO spinner? */}
          {error && (
            // TODO better error?
            <li>
              <strong>{error.message}</strong>
            </li>
          )}
          <li>
            <CartButton count={cartCount} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
