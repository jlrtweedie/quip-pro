import io from 'socket.io-client';
import TestRequest from './TestRequest';
import TestResponse from './TestResponse';

let sio = io.connect('http://localhost');

function SocketHandler() {
  return (dispatch) => {
      sio.
  }
}
