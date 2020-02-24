import React from "react";

const useDidMount = fn => {
  React.useEffect(fn, []);
};

export default useDidMount;
