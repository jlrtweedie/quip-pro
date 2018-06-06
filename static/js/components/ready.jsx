import React from 'react';
import { connect } from 'react-redux';

class Ready extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch({type: 'server/ready', data:
  //     {player_id: this.props.player.player_id}
  //   });
  // }

  sendReady() {
    if (this.props.phase === 'ready') {
      this.props.dispatch({type: 'server/ready', data:
        {player_id: this.props.player.player_id}
      });
    }
  }

  render() {
    this.sendReady();
    return <div></div>
  }
}

function mapStateToProps(state) {
  return {
    // joinGame: state.joinGame,
    gameState: state.gameState
  }
}

export default connect(mapStateToProps)(Ready);
