import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: 'test',
        password: ''
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
    this.props.dispatch({type:'server/login', data: this.state.data});
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input type="text" onChange={this.handleUserInput} name="email" />
        <input type="password" onChange={this.handleUserInput} name="password" />
        <button onClick={this.handleSubmit} name="login">Login</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    game: state.game,
    player: state.player
  }
}

export default connect(mapStateToProps)(Login);
