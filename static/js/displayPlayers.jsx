import React from 'react';
import { connect } from 'react-redux';
import { sio } from './socket.js';


class DisplayPlayers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			game_id: '',
			player_names: [],
			joined_game: false
		};
	}

	gameData(id) {
		sio.emit('load_players', {game_id: this.state.game_id})
	}

	render() {
		sio.on('joined_game', (msg) => {
			this.setState({joined_game: msg.data});
			if (msg.data) {
				this.setState({game_id: msg.game_id});
				this.gameData(msg.game_id);
			}
		});
		sio.on('display_players', (msg) => {
			this.setState({player_names: msg.player_names});
		})

		let players = this.state.player_names;
		let playerList = players.map((player, i) => {
			return <li key={i}>{ player }</li>;
		});
		
		if (this.state.joined_game) {
			return (
				<div>
					Players in game:
					<br />
					<ul>{ playerList }</ul>
				</div>
			);
		} else {
			return null
		}
	}
}


export default DisplayPlayers;