// const initialState = {
//   data: ''
// }

function SocketReducer(state = {}, action) {
  switch(action.type) {
    case 'message':
      const message = Object.assign({}, {message:action.data});
      console.log(message);
      return message;
    case 'response':
      const response = Object.assign({}, {response:action.data});
      console.log(response);
      return response;
    default:
      return state;
  }
}

export default SocketReducer
