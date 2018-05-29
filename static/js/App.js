// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import SocketReducer from './reducers/socketReducer';

// import Ping from './ping.jsx';
// import Login from './login.jsx';
// import Log from './log.jsx';
// import JoinGame from './joinGame.jsx';
// import CreateGame from './createGame.jsx';
// import DisplayGame from './displayGame.jsx';
// import DisplayPlayers from './displayPlayers.jsx';
import LoadData from './loadData.jsx';

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(SocketReducer);

export default class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				{/* <Ping /> */}
				<LoadData />
				{/* <Login /> */}
				{/* <JoinGame /> */}
				{/* <CreateGame /> */}
				{/* <DisplayGame /> */}
				{/* <DisplayPlayers /> */}
				{/*<Log />*/}
			</Provider>
		);
	}
}
