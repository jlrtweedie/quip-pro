// App.jsx
import React from 'react';
import Ping from './ping.jsx';
import Login from './login.jsx';
import Log from './log.jsx';
import JoinGame from './joinGame.jsx';
import CreateGame from './createGame.jsx';
import DisplayGame from './displayGame.jsx';

import LandingPage from './landingPage';

export default class App extends React.Component {
	render() {
		return (
			<div>
				{/* <Ping /> */}
				<LandingPage />
				{/* <CreateGame /> */}
				{/* <DisplayGame /> */}
				{/* <Log /> */}
			</div>
		);
	}
}
