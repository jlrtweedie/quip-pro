import React from 'react';
import { connect } from 'react-redux';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.dispatch({type:'server/'.concat(e.target.name)});
  }

  render() {
    return (
      <div>
        <h2>Logged in as: {this.props.account.email}</h2>
        <button onClick={this.handleSubmit} name="logout">Logout</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Logout);
