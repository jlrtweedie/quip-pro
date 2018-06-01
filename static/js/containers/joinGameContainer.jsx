import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import JoinGame from '../components/joinGame.jsx';
import LeaveGame from '../components/leaveGame.jsx';
import DisplayPlayers from '../components/displayPlayers.jsx';

class JoinGameContainer extends React.Component {
  render() {
    const stateProps = this.props.store.getState();
    const join_game = stateProps.join_game.join_game;
    const game = stateProps.join_game.game;
    const player = stateProps.join_game.player;
    const player_names = stateProps.player_names.player_names;
    return (
      <div>
        { join_game === false ? (
          <JoinGame />
        ) : (
          <div>
            <LeaveGame game={game} player={player} />
            <DisplayPlayers player_names={player_names} />
          </div>
        ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    join_game: state.join_game,
    player_names: state.player_names
  }
}

export default connect(mapStateToProps)(JoinGameContainer);
