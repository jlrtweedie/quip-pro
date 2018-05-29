// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';

import SocketReducer from './reducers/socketReducer';

// import Ping from './ping.jsx';
// import Login from './login.jsx';
// import Log from './log.jsx';
// import JoinGame from './joinGame.jsx';
// import CreateGame from './createGame.jsx';
// import DisplayGame from './displayGame.jsx';
// import DisplayPlayers from './displayPlayers.jsx';
import LoadData from './components/loadData.jsx';
import Login from './components/login.jsx';

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(SocketReducer);

class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
        <div>
				{/* <Ping /> */}
				  <LoadData />
          <Login />
				{/* <Login /> */}
				{/* <JoinGame /> */}
				{/* <CreateGame /> */}
				{/* <DisplayGame /> */}
				{/* <DisplayPlayers /> */}
				{/*<Log />*/}
        </div>
			</Provider>
		);
	}
}
ReactDOM.render(
  <App />,
  document.getElementById("content")
);
