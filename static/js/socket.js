import io from 'socket.io-client'


class Socket {
	static getValue() {
		return io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/test');
	}
}


export default Socket;