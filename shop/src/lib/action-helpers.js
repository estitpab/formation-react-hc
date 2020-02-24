// generator (helper)
export const asyncActionCreatorFactory = (asyncFunction, prefix) => {
  // action creator
  return (...params) => {
    // action (intercepted by thunkMiddleware)
    return dispatch => {
      dispatch({
        type: `${prefix}_START`
      });
      return asyncFunction(...params)
        .then(cart =>
          dispatch({
            type: `${prefix}_SUCCESS`,
            payload: { result: cart }
          })
        )
        .catch(error =>
          dispatch({
            type: `${prefix}_ERROR`,
            error
          })
        );
    };
  };
};
