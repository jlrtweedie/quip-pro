import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class LeaveGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name), data:
      {player_id: this.props.player.player_id, game_id: this.props.game.game_id}});
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.handleSubmit} name="leave_game">Leave Game</Button>
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
