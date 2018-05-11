export class Socket {
	static getValue() {
		return io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/test');
	}
}
