// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

// import Ping from './ping.jsx';
// import Login from './login.jsx';
// import Log from './log.jsx';
// import JoinGame from './joinGame.jsx';
// import CreateGame from './createGame.jsx';
// import DisplayGame from './displayGame.jsx';
// import DisplayPlayers from './displayPlayers.jsx';
// import LoadData from './loadData.jsx';

// import { sio } from './socket.js';

function reducer(state = {}, action) {
	switch(action.type) {
    case 'message':
		 	const response = Object.assign({}, {message:action.data});
			console.log(response);
      return response;
    default:
      return state;
	}
}

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(reducer);

store.dispatch({type:'server/hello', data:'Hello!'});

export default class App extends React.Component {

	render() {
		return (
			<div>
				{/* <Ping /> */}
				{/* <LoadData /> */}
				{/* <Login /> */}
				{/* <JoinGame /> */}
				{/* <CreateGame /> */}
				{/* <DisplayGame /> */}
				{/* <DisplayPlayers /> */}
				{/*<Log />*/}
			</div>
		);
	}
}
