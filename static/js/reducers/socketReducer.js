// import { combineReducers } from 'redux';

const initialState = {
  login: {
    login: false,
    account: {}
  },
  query: {
    account: {},
    game: {},
    player: {}
  },
  join_game: {
    join_game: false,
    game: {},
    player: {}
  }
}

const loginState = {
  login: {
    login: false,
    account: {}
  }
}

const joinGameState = {
  join_game: {
    join_game: false,
    game: {},
    player: {}
  }
}

export function LoginReducer(state = initialState, action) {
  switch(action.type) {
    case 'login':
      const login = Object.assign({}, {login: action.data});
      return login;
    default:
      return state
  }
}

export function JoinGameReducer(state = initialState, action) {
  switch (action.type) {
    case 'join_game':
      console.log('Test')
      const join_game = Object.assign({}, {join_game: action.data});
      return join_game;
    default:
      return state
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
    case 'join_game':
      const join_game = Object.assign({}, {join_game:action.data});
      // console.log(join_game);
      return join_game
    default:
      return state;
  }
}

// export const rootReducer = combineReducers({LoginReducer, JoinGameReducer});
