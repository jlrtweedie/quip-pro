import React from 'react';
import { connect } from 'react-redux';
import { sio } from './socket.js';


class LoadData extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		this.props.dispatch({ type: 'server/action', element: e.target.name, key: 1 })
	}

	render() {
		return (
			<div>
				<h2>Load Data</h2>
				<button onClick={this.handleSubmit} name="account">Load Account</button>
				<button onClick={this.handleSubmit} name="game">Load Game</button>
				<button onClick={this.handleSubmit} name="player">Load Player</button>
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


export default connect(mapStateToProps)(LoadData);