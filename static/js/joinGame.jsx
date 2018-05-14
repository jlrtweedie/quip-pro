class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        playerName: '',
        roomId: ''
      }
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    let formData = Object.assign({}, this.state.formData);
    formData[e.target.name] = e.target.value;
    this.setState({formData});
  }

  handleSubmit(e) {
    socket.emit('join_game', {
      player_name: this.state.formData['playerName'],
      room_id: this.state.formData['roomId']
    });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleUserInput} name="playerName" />
        <input type="text" onChange={this.handleUserInput} name="roomId" />
        <button onClick={this.handleSubmit}>Join Game</button>
      </div>
    );
  }
}

ReactDOM.render(
  <JoinGame />,
  document.getElementById('join-game')
);
