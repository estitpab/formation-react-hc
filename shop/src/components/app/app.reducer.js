/* version "immutable.js":
export const initialState = Immutable.fromJS({
  categories: {
    loading: false,
    error: null,
    result: null
  },
  currentCategory: null
});
*/

export const initialState = {
  categories: {
    loading: false,
    error: null,
    result: null // Array<string>
  },
  currentCategory: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_START":
      // Immutable:
      // return state
      //   .set('currentCategory', null)
      //   .set('categories', Map({ ... }))
      return {
        ...state,
        categories: { loading: true, error: null, result: null },
        currentCategory: null
      };

    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: {
          loading: false,
          error: null,
          result: action.payload.result
        },
        currentCategory: action.payload.result[0]
      };

    case "GET_CATEGORIES_ERROR":
      return {
        ...state,
        categories: { loading: false, error: action.error, result: null }
      };

    case "SET_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload.category
      };

    default:
      return state;
  }
};
