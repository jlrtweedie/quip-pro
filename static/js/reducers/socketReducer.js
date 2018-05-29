const initialState = {
  login: false,
  account: {},
  game: {},
  player: {}
}

function SocketReducer(state = initialState, action) {
  switch(action.type) {
    case 'message':
      const message = Object.assign({}, {message:action.data});
      console.log(message);
      return message;
    case 'response':
      const response = Object.assign({}, {response:action.data});
      console.log(response);
      return response;
    case 'account':
      const account = Object.assign({}, {account:action.data});
      console.log(account);
      return account;
    case 'login':
      const login = Object.assign({}, {login:action.data});
      console.log(login);
      return login;
    default:
      return state;
  }
}

export default SocketReducer
