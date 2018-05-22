// App.jsx
import React from 'react';
import Ping from './ping.jsx';
import Login from './login.jsx';
import JoinGame from './joinGame.jsx';
import CreateGame from './createGame.jsx';
import DisplayGame from './displayGame.jsx';
import Log from './log.jsx';


export default class App extends React.Component {
	render() {
		return (
			<div>
				<Ping />
				<Login />
				<JoinGame />
				<CreateGame />
				<DisplayGame />
				<Log />
			</div>
		);
	}
}