import React from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron, Col } from 'reactstrap';

import { createStore, applyMiddleware, combineReducers, getState } from 'redux';
import { Provider } from 'react-redux';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import {
	MessageReducer,
	LoginReducer,
	JoinGameReducer,
	PlayerNameReducer,
	GameStateReducer
} from './reducers/socketReducer';

import LoginContainer from './containers/loginContainer.jsx';
import JoinGameContainer from './containers/joinGameContainer.jsx';
import GameStateContainer from './containers/gameStateContainer.jsx';

const rootReducer = combineReducers({
	message: MessageReducer,
	login: LoginReducer,
	joinGame: JoinGameReducer,
	playerNames: PlayerNameReducer,
	gameState: GameStateReducer
})

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(rootReducer);

class App extends React.Component {
	render() {
		return (
			<div>
        <LoginContainer store={store} />
				<br />
        <br />
				<Col sm={{size: 8, offset:2}}>
					<Jumbotron>
						<JoinGameContainer store={store} />
						<GameStateContainer store={store} />
						</Jumbotron>
				</Col>
      </div>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById("content")
);
