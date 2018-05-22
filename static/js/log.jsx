import React from 'react';
import Socket from './socket.js';

let sio = Socket.getValue();


class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = { logged_messages: [] };
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('test');
		sio.on('my_response', (msg) => this.logMessage());
	}

	logMessage(msg) {
		let logged_messages = this.state.logged_messages;
		logged_messages.push(msg);
		this.setState({logged_messages});
	}

	render() {
		let messages = this.state.logged_messages.slice(-10).reverse();
		let displayMessages = messages.map((msg) => {
			return <li>{msg}</li>;
		})

		return <ul>{ displayMessages }</ul>
	}
}


export default Log;