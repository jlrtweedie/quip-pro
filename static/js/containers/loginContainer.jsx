import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/login.jsx';
import Logout from '../components/logout.jsx';
import CreateGame from '../components/createGame.jsx';
import ChangeGameState from '../components/changeGameState.jsx';

class LoginContainer extends React.Component {
	render() {
		const stateProps = this.props.store.getState().login;
		const account = stateProps.account;
		const game = stateProps.game;
		return (
        <div>
				  { account === null ? (
				  	<Login />
				  ) : (
				  	<div>
				  		<Logout account={account} />
							{ game === null ? (
								<CreateGame account={account} />
							) : (
								<ChangeGameState account={account} game={game} />
							) }
				  	</div>
				  ) }
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
