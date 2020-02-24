const Button = ({ delay = 2000, onClick, ...props }) => {
  const clickable = React.useRef(true);
  const timeoutId = React.useRef();

  React.useEffect(() => {
    return () => {
      // onUnmount
      clearTimeout(timeoutId.current);
    };
  }, []);

  const realOnClick = e => {
    if (!clickable.current) return false;

    clickable.current = false;
    timeoutId.current = setTimeout(() => {
      clickable.current = true;
    }, delay);

    if (onClick) onClick(e);
  };

  return <button onClick={realOnClick} {...props} />;
};
