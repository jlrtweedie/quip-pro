import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';
// import { Jumbotron, Col } from 'reactstrap';

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
                <div>
                  <h2>Join Game</h2>
                  <hr />
                  <JoinGame />
                  </div>
                ) : (
                  <div>
                  <h2>Connected to game {game.room_id} as {player.name}</h2>
                  <hr />
                  <h3>Players in Game:</h3>
                  <DisplayPlayers names={names} />
                  <LeaveGame game={game} player={player} />
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
