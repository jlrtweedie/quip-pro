class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    socket.emit('create_game', this.state.email);
  }

  render() {
    socket.on('logged_in', (msg) => {
      this.setState({ email: msg.data });
    });
    socket.on('logged_out', () => {
      this.setState({ email: '' });
    });

    if (this.state.email) {
      return (
        <div>
          <button onClick={this.handleSubmit}>Create Game</button>
        </div>
      );
    } else {
      return null
    }
  }
}

ReactDOM.render(
  <CreateGame />,
  document.getElementById('create-game')
);
