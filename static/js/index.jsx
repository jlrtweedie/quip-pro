import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import SocketReducer from './reducers/socketReducer';

import LoginContainer from './containers/loginContainer.jsx';

let socket = io('http://localhost:5000');
let SocketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
let store = applyMiddleware(SocketIoMiddleware)(createStore)(SocketReducer);

class App extends React.Component {
	render() {
		return (
			<div>
        <LoginContainer store={store} />
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
