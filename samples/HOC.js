/*
App
  Connect(MonComponent)
    MonComponent
*/

const connect = (Component, selectData) =>
  class ConnectedComponent extends React.PureComponent {
    state = selectData(store.getData());
    componentDidMount() {
      (subscribe) => this.setState(selectData(data));
    }
    componentWillUnmount() {
      unsubscribe;
    }
    render() {
      return <Component {...this.state} />;
    }
  };

class MonComponent extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.username} {this.props.x}
      </div>
    );
  }
}

export default connect(
  withMousePosition(MonComponent),
  (data) => ({ username: data.username }),
);
