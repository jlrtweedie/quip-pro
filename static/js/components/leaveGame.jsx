import React from 'react';
import { connect } from 'react-redux';

class LeaveGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.dispatch({type:'server/join_game', data: null, handle:
      {player_id: this.props.player.player_id, game_id: this.props.game.game_id}});
  }

  render() {
    return (
      <div>
        <h2>Joined game {this.props.game.room_id} as {this.props.player.name}</h2>
        <button onClick={this.handleSubmit} name="leave_game">Leave Game</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    join_game: state.join_game
  }
}

export default connect(mapStateToProps)(LeaveGame);
