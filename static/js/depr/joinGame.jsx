import React from 'react';
import { sio } from './socket.js';


class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        room_id: '',
        player_name: ''
      },
      joinedGame: false
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
    sio.emit(e.target.name, this.state.formData);
  }

  render() {
    sio.on('joined_game', (msg) => {
      this.setState({joinedGame: msg.data});
    });

    if (!this.state.joinedGame) {
      return (
        <div>
          <input type="text" onChange={this.handleUserInput} name="player_name" />
          <input type="text" onChange={this.handleUserInput} name="room_id" />
          <button onClick={this.handleSubmit} name="join_game">Join Game</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.handleSubmit} name="leave_game">Leave Game  {this.state.formData['room_id'].toUpperCase()}</button>
        </div>
      );
    }
  }
}


export default JoinGame;