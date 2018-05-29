const initialState = {
  login: {
    login: false,
    account: {}
  },
  query: {
    account: {},
    game: {},
    player: {}
  }
}

function SocketReducer(state = initialState, action) {
  switch(action.type) {
    case 'message':
      const message = Object.assign({}, {message:action.data});
      // console.log(message);
      return message;
    case 'query':
      const query = Object.assign({}, {query:action.data});
      // console.log(response);
      return query;
    case 'login':
      const login = Object.assign({}, {login:action.data});
      // console.log(login);
      return login;
    default:
      return state;
  }
}

export default SocketReducer
