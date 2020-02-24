const initCounter = selector => {
  // $(selector).datePicker()
  let value = 0;
  let originalContent = document.querySelector(selector).innerText;
  document.querySelector(selector).innerText = String(value);
  document.querySelector(selector).addEventListener("click", () => {
    value++;
    document.querySelector(selector).innerText = String(value);
  });
  // $(selector).datePicker('destroy')
  return () => {
    document.querySelector(selector).innerText = originalContent;
  };
};

const LegacyCounter1 = React.memo(() => {
  const ref = React.useRef(
    "counter" + String(Math.round(Math.random() * 1000000))
  );

  const randomId = ref.current;

  React.useEffect(() => {
    const cleanup = initCounter("#" + randomId);
    return cleanup;
  });

  return <div id={randomId} />;
});

class LegacyCounter2 extends React.PureComponent {
  randomId = "counter" + String(Math.round(Math.random() * 1000000));
  componentDidMount() {
    this.cleanup = initCounter("#" + this.randomId);
  }
  componentWillUnmount() {
    this.cleanup();
  }
  render() {
    return <div id={this.randomId} />;
  }
}

class LegacyCounterBrute extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    this.cleanup = initCounter("#counter");
  }
  componentWillUnmount() {
    this.cleanup();
  }
  render() {
    return <div id="counter" />;
  }
}
