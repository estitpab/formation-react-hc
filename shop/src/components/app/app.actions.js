import { getCategories } from "../../lib/api";

export const fetchCategories = () => dispatch => {
  dispatch({
    type: "GET_CATEGORIES_START"
  });
  getCategories()
    .then(cart =>
      dispatch({
        type: "GET_CATEGORIES_SUCCESS",
        payload: { result: cart }
      })
    )
    .catch(error =>
      dispatch({
        type: "GET_CATEGORIES_ERROR",
        error
      })
    );
};

export const setCurrentCategory = category => ({
  type: "SET_CATEGORY",
  payload: { category: category }
});
