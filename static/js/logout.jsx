class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    socket.emit('logout');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Logout</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Logout />,
  document.getElementById('logout')
);
