// import { combineReducers } from 'redux';

const initialState = {
  message: {},
  login: {
    login: false,
    account: {}
  },
  join_game: {
    join_game: false,
    game: {},
    player: {}
  },
  player_names: {
    player_names: []
  },
  query: {
    account: {},
    game: {},
    player: {}
  }
}

export function PlayerNameReducer(state=initialState.player_names, action) {
  switch(action.type) {
    case 'player_names':
      const player_names = Object.assign({}, action.data);
      console.log(player_names);
      return player_names;
    default:
      return state;
  }
}

export function MessageReducer(state = initialState.message, action) {
  switch(action.type) {
    case 'message':
      const message = Object.assign({}, action.data);
      return message;
    default:
      return state;
  }
}

export function LoginReducer(state = initialState.login, action) {
  switch(action.type) {
    case 'login':
      const login = Object.assign({}, action.data);
      return login;
    default:
      return state;
  }
}

export function JoinGameReducer(state = initialState.join_game, action) {
  switch (action.type) {
    case 'join_game':
      const join_game = Object.assign({}, action.data);
      return join_game;
    default:
      return state;
  }
}

// const rootReducer = combineReducers({
// 	login: LoginReducer,
// 	join_game: JoinGameReducer
// })

// function SocketReducer(state = initialState, action) {
//   switch(action.type) {
//     case 'message':
//       const message = Object.assign({}, {message:action.data});
//       // console.log(message);
//       return message;
//     case 'query':
//       const query = Object.assign({}, {query:action.data});
//       // console.log(response);
//       return query;
//     case 'login':
//       const login = Object.assign({}, {login:action.data});
//       // console.log(login);
//       return login;
//     case 'join_game':
//       const join_game = Object.assign({}, {join_game:action.data});
//       // console.log(join_game);
//       return join_game;
//     default:
//       return state;
//   }
// }

// export const rootReducer = combineReducers({LoginReducer, JoinGameReducer});
