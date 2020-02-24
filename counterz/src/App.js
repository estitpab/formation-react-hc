import React from "react";
import logo from "./logo.svg";
import "./App.scss";

/* globals socket:readonly */

const withPosition = OriginalComponent => () => {
  const [position, error] = usePosition();
  return <OriginalComponent position={state.position} error={state.error} />;
};

const Composant = withPosition(
  class extends React.Component {
    render() {
      // this.props.position, this.props.render
    }
  }
);

const usePosition = () => {
  const [position, setPosition] = React.useState(null);
  const [error, setError] = React.useState(null);
  navigator.geolocation.getCurrentPosition(
    position => setPosition(position),
    err => setError(err)
  );
  return [position, error];
};

const Composant = () => {
  const [position, error] = usePosition();
  if (error) return <span>oops</span>;
  if (position) return <span>vous êtes ici</span>;
  return <span>loading...</span>;
};

/**
 * Version fonction + hooks
 */

const Counter = ({ initialValue = 0 }) => {
  const [value, setValue] = React.useState(initialValue);

  /*
  const [messages, setMessages] = React.useState([]);
  const addMessage = item => setMessages(list => [...list, item]);

  // didMount + willUnmount
  React.useEffect(() => {
    socket.addListener("message", addMessage);
    // cleanup
    return () => {
      socket.removeListener("message", addMessage);
    };
  }, [addMessage]); // empty dependencies = mount/unmount


  React.useEffect(() => {
    console.log("changed messages", messages);
  }, [messages]);

  React.useEffect(() => {
    socket.addListener("room-" + value, foo);
    console.log("changed value", value);
    return () => socket.removeListener("room-" + value, foo);
  }, [value]);

  // didUpdate (TODO check?)
  React.useEffect(() => {
    // side effect
  }); // no dependency = each render
  */

  const incr = () => setValue(value + 1);

  const handleClick = e => {
    e.preventDefault();
    incr();
  };

  return (
    <button className="Counter" onClick={handleClick}>
      {value}
    </button>
  );
};

/**
 * Version class
 */

class CounterClass extends React.Component {
  state = {
    value: this.props.initialValue
  };

  static defaultProps = {
    initialValue: 0
  };

  handleClick = e => {
    e.preventDefault();
    this.incr();
  };

  incr = () => {
    //this.setState(state => {
    //  return { value: state.value + 1 };
    //});

    // Attention parenthèse obligatoire pour que le parseur JS ne confonde pas avec un label (lol)
    this.setState(state => ({
      value: state.value + 1
    }));
  };

  render() {
    return (
      <button className="Counter" onClick={this.handleClick}>
        {this.state.value}
      </button>
    );
  }

  // Lifecycle
  componentDidMount() {
    console.log("Counter#didMount");
    // addMessage = (item) => this.setState(state => ({ list: [...state.list, item]}))
    // socket.addListener('message', this.addMessage)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Counter#didUpdate");
    if (prevState.messages !== this.state.messages) {
      console.log("new messages", this.state.messages);
    }
    if (prevState.value !== this.state.value) {
      console.log("new value", this.state.value);
    }
  }
  componentWillUnmount() {
    // socket.removeListener('message', this.addMessage)
    console.log("Counter#willUnmount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("Counter#shouldUpdate");
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Counter#snapshot");
    return null;
  }
}

function App() {
  const [nbCounters, setNbCounters] = React.useState(0);

  const handleClick = e => {
    e.preventDefault();
    setNbCounters(n => n + 1);
  };

  const lis = [];
  for (let i = 0; i < nbCounters; i++) {
    lis.push(
      <li key={i}>
        <Counter />
      </li>
    );
  }

  lis.reverse();

  return (
    <div className="App">
      <button onClick={handleClick}>Add counter</button>
      <ul>{lis}</ul>
    </div>
  );
}

export default App;
