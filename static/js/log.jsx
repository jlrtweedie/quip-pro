import React from 'react';
import { sio } from './socket.js';


class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = { logged_messages: [] };
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	sio.on('my_response', () => {
	// 		console.log('test');
	// 	});
	// }

	logMessage(msg) {
		let messages = this.state.logged_messages;
		console.log(messages);
		messages.push(msg.data);
		this.setState({logged_messages: messages});
	}

	render() {
		sio.on('my_response', (msg) => this.logMessage(msg));
			// let current_log = this.state.logged_messages;
			// current_log.push(msg.data);
			// this.setState({ logged_messages: current_log });
			// console.log(this.state.logged_messages);
		

		let messages = this.state.logged_messages;
		let messageList = messages.map((message, i) => {
			return <li key={i}>{ message }</li>;
		});

		return (
			<div>
				Log:
				<br />
				<ul>{ messageList }</ul>
			</div>
		)
	}
}


export default Log;