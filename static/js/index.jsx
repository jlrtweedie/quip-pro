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
	PlayerNameReducer
} from './reducers/socketReducer';
// import { rootReducer } from './reducers/socketReducer';

import LoginContainer from './containers/loginContainer.jsx';
import JoinGameContainer from './containers/joinGameContainer.jsx';

const rootReducer = combineReducers({
	message: MessageReducer,
	login: LoginReducer,
	join_game: JoinGameReducer,
	player_names: PlayerNameReducer
})

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(rootReducer);

class App extends React.Component {
	render() {
		// const stateProps = this.props.store.getState();
		// console.log(stateProps);
		return (
			<div>
        <LoginContainer store={store} />
				<JoinGameContainer store={store} />
      </div>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
  	<App store={store}/>
  </Provider>,
  document.getElementById("content")
);
