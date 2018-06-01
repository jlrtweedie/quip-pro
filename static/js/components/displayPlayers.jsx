import React from 'react';
// import { connect } from 'react-redux';

class DisplayPlayers extends React.Component {
	render() {
		let players = this.props.player_names;
		let playerList = players.map((player, i) => {
			return <li key={i}>{ player }</li>;
		});

		return (
			<div>
				Players in game:
				<br />
				<ul>{ playerList }</ul>
			</div>
		)
	}
}

export default DisplayPlayers;