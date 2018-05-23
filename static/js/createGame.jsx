import React from 'react';
import { sio } from './socket.js';


class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    sio.emit('create_game', this.state.email);
  }

  render() {
    sio.on('logged_in', (msg) => {
      this.setState({ email: msg.data });
    });
    sio.on('logged_out', () => {
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


export default CreateGame;