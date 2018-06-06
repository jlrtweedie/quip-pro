import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
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
    this.props.dispatch({type:'server/'.concat(e.target.name), data: this.state.data});
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        Email: <input type="text" onChange={this.handleUserInput}
                 name="email" maxLength="64" />&nbsp;
        Password: <input type="password" onChange={this.handleUserInput}
                    name="password" maxLength="128" />&nbsp;
        <button onClick={this.handleSubmit} name="login">Login</button>&nbsp;
        <button onClick={this.handleSubmit} name="register">Register</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login);
