import React from 'react';
import { connect } from 'react-redux';

class ChangeGameState extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name), data:
      {account_id: this.props.account.account_id, game_id: this.props.game.game_id}
    });
  }

  render() {
    return (
      <div>
        <h2>Start or End Game {this.props.game.room_id}</h2>
        <button onClick={this.handleSubmit} name="start_game">Start Game</button> &nbsp;
        <button onClick={this.handleSubmit} name="delete_game">End Game</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(ChangeGameState);
