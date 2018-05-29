// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

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
import LoadData from './components/loadData.jsx';
import Login from './components/login.jsx';

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(SocketReducer);

class App extends React.Component {
	componentDidMount() {
		this.props.store.subscribe(this.forceUpdate.bind(this));
	}


	render() {
		const stateProps = this.props.store.getState();
		const login = stateProps.login;
		return (
        <div>
				{/* <Ping /> */}
				  <LoadData />
				  { login === false ? <Login /> : <div></div> }
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

ReactDOM.render(
	<Provider store={store}>
  	<App store={store} />
  </Provider>,
  document.getElementById("content")
);
