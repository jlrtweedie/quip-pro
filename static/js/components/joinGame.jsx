import React from 'react';
import { connect } from 'react-redux';

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        room_id: '',
        name: ''
      }
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    let data = Object.assign({}, this.state.data);
    data[e.target.name] = e.target.value;
    this.setState({data});
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name), data: this.state.data});
  }

  render() {
    return (
      <div>
        <h2>Join Game</h2>
        Name: <input type="text" onChange={this.handleUserInput} name="name" />&nbsp;
        Room ID: <input type="text" onChange={this.handleUserInput} name="room_id" />&nbsp;
        <button onClick={this.handleSubmit} name="join_game">Join Game</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    join_game: state.join_game
  }
}

export default connect(mapStateToProps)(JoinGame);
