import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/login.jsx';
import Logout from '../components/logout.jsx';


class LoginContainer extends React.Component {


	render() {
		const stateProps = this.props.store.getState();
		const login = stateProps.login.login;
		const account = stateProps.login.account;
		return (
        <div>
				  { login === false ? <Login /> : <Logout account={account} /> }
        </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		login: state.login
	}
}


export default connect(mapStateToProps)(LoginContainer);