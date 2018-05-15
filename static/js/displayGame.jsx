class DisplayGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      game: {
        room_id: '',
        started_at: ''
      }
    };
    this.endGame = this.endGame.bind(this);
  }

  endGame() {
    socket.emit('end_game', {email: this.state.email,
                             room_id: this.state.game['room_id']}
    );
  }

  render() {
    socket.on('logged_in', (msg) => {
      this.setState({ email: msg.data });
      socket.emit('load_game', this.state.email);
    });
    socket.on('display_game', (msg) => {
      let game = Object.assign({}, this.state.game);
      game['room_id'] = msg.room_id;
      game['started_at'] = msg.started_at;
      this.setState({game});
    });
    socket.on('logged_out', () => {
      let game = Object.assign({}, this.state.game);
      game['room_id'] = '';
      game['started_at'] = '';
      this.setState({ email: '', game });
    });

    if (this.state.game['room_id']) {
      return (
        <div>
          Active game {this.state.game['room_id']} started at {this.state.game['started_at']} &nbsp;
          <button onClick={this.endGame}>End Game {this.state.game['room_id']}</button>
        </div>
      );
    } else {
      return null
    }
  }
}

ReactDOM.render(
  <DisplayGames />,
  document.getElementById('display-game')
);
