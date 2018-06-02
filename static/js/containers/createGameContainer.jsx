import React from 'react';
import { getState } from 'redux';
import { connect } from 'react-redux';

import CreateGame from '../components/createGame.jsx';
import DeleteGame from '../components/deleteGame.jsx';
import StartGame from '../components/startGame.jsx';

class CreateGameContainer extends React.Component {
	render() {
		const stateProps = this.props.store.getState();
		return (
			<div>
				{ login === false ? (
					<div></div>
				) : (
					game === false ? (
					) : (
					)
				) }
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		login: state.login,
		create_game: state.create_game
	}
}

export default connect(mapStateToProps)(CreateGameContainer);