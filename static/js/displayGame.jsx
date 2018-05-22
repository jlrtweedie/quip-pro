import React from 'react';
import Socket from './socket.js';

let sio = Socket.getValue();


class DisplayGame extends React.Component {
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
    sio.emit('end_game', {email: this.state.email,
                             room_id: this.state.game['room_id']}
    );
  }

  render() {
    sio.on('logged_in', (msg) => {
      this.setState({ email: msg.data });
      sio.emit('load_game', this.state.email);
    });
    sio.on('display_game', (msg) => {
      let game = Object.assign({}, this.state.game);
      game['room_id'] = msg.room_id;
      game['started_at'] = msg.started_at;
      this.setState({game});
    });
    sio.on('logged_out', () => {
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


export default DisplayGame;

// ReactDOM.render(
//   <DisplayGames />,
//   document.getElementById('display-game')
// );
