import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import JoinGame from '../components/joinGame.jsx';
import LeaveGame from '../components/leaveGame.jsx';

class JoinGameContainer extends React.Component {
  render() {
    const stateProps = this.props.store.getState().join_game;
    const join_game = stateProps.join_game;
    const game = stateProps.game;
    const player = stateProps.player;
    return (
      <div>
        { join_game === false ? (
          <JoinGame />
        ) : (
          <LeaveGame game={game} player={player} />
        ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    join_game: state.join_game
  }
}

export default connect(mapStateToProps)(JoinGameContainer);
