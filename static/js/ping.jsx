import React from 'react';
import { sio } from './socket.js';


class Ping extends React.Component {
	constructor(props) {
  	super(props);
  	this.state = { start_time: (new Date).getTime() };
  	this.ping_pong_times = [];
  }

  componentDidMount() {
  	this.timerID = setInterval(
  		() => this.ping(), 1000
  	);
  }

  componentWillUpdate(nextProps, nextState) {
  	sio.on('my_pong', () => this.pong());
  }

  ping() {
  	this.setState({
  		start_time: (new Date).getTime()
  	});
  	sio.emit('my_ping');
  }

  pong() {
  	let latency = (new Date).getTime() - this.state.start_time;
  	this.ping_pong_times.push(latency);
  	this.ping_pong_times = this.ping_pong_times.slice(-30);
  	let sum = 0;
  	for (let i = 0; i < this.ping_pong_times.length; i++) {
  		sum += this.ping_pong_times[i];
  	}
  	this.avg_latency = Math.round(10 * sum / this.ping_pong_times.length) / 10;
  }

  render() {
  	return <p>Average ping/pong latency: <b>{ this.avg_latency }ms</b></p>
  }
}


export default Ping;