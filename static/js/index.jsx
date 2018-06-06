import React from 'react';
import ReactDOM from 'react-dom';

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
				<JoinGameContainer store={store} />
				<GameStateContainer store={store} />
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
