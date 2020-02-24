import React from "react";
//import useDidMount from "./useDidMount";

// Declared globally to share reference between calls
const initialStatus = {
  loading: true,
  result: null,
  error: null
};

const useAsync = asyncFunction => {
  const [{ loading, result, error }, setStatus] = React.useState(initialStatus);

  React.useEffect(() => {
    // start
    setStatus(initialStatus); // reset status
    asyncFunction()
      .then(result => setStatus({ loading: false, result }))
      .catch(error => setStatus({ loading: false, error }));
    return () => {
      // TODO cancel request?
    };
  }, [asyncFunction]);

  return [error, loading, result];
};

export default useAsync;
