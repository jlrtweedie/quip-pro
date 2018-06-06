import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import JoinGame from '../components/joinGame.jsx';
import LeaveGame from '../components/leaveGame.jsx';
import DisplayPlayers from '../components/displayPlayers.jsx';

class JoinGameContainer extends React.Component {
  render() {
    const stateProps = this.props.store.getState();
    const game = stateProps.joinGame.game;
    const player = stateProps.joinGame.player;
    const names = stateProps.playerNames.names;
    const phase = stateProps.gameState.phase;
    return (
      <div>
        { phase === null ? (
          <div>
            { game === null ? (
              <JoinGame />
            ) : (
              <div>
                <LeaveGame game={game} player={player} />
                <DisplayPlayers names={names} />
              </div>
            ) }
          </div>
        ) : (
          <div></div>
        ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    joinGame: state.joinGame,
    playerNames: state.playerNames,
    gameState: state.gameState
  }
}

export default connect(mapStateToProps)(JoinGameContainer);
