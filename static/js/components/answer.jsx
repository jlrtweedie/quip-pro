import React from 'react';
import { connect } from 'react-redux';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        answer: ''
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
    this.props.dispatch({type:'server/'.concat(e.target.name), data:
      {player_id: this.props.player.player_id,
       prompt_id: this.props.prompt.prompt_id,
       answer: this.state.data.answer}
     });
     let data = Object.assign({}, this.state.data);
     data[e.target.name] = '';
     this.setState({data});
  }

  render() {
    return (
      <div>
        <h2>{this.props.prompt.text}</h2>
        Answer: <input type="text" onChange={this.handleUserInput}
                  name="answer" maxLength="24" /> &nbsp;
        <button onClick={this.handleSubmit} name="answer">Submit</button>
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

export default connect(mapStateToProps)(Answer);
