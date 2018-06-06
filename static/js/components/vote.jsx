import React from 'react';
import { connect } from 'react-redux';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    console.log(this.props.phase);
    console.log(this.props.waiting);
    if (this.props.phase === 'voting' && this.props.waiting === false) {
      this.props.dispatch({type:'server/'.concat(e.target.name), data:
        {player_id: this.props.player.player_id,
         answer_id: this.props.answer.answer_id}
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}
          name="vote">{this.props.answer.text}</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    joinGame: state.joinGame,
    gameState: state.gameState
  }
}

export default connect(mapStateToProps)(Vote);
