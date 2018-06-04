const initialState = {
  message: {
    message: {}
  },
  login: {
    account: null,
    game: null
  },
  joinGame: {
    game: null,
    player: null
  },
  // create_game: {
  //   account: {},
  //   game: {}
  // },
  playerNames: {
    names: []
  }
}

export function MessageReducer(state = initialState.message, action) {
  switch(action.type) {
    case 'message':
      const message = Object.assign({}, action.data);
      console.log(message);
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
    case 'logout':
      const logout = initialState.login;
      return logout;
    default:
      return state;
  }
}

export function JoinGameReducer(state = initialState.joinGame, action) {
  switch (action.type) {
    case 'join_game':
      const joinGame = Object.assign({}, action.data);
      return joinGame;
    default:
      return state;
  }
}

// export function CreateGameReducer(state = initialState.create_game, action) {
//   switch (action.type) {
//     case 'create_game':
//       const create_game = Object.assign({}, action.data);
//       return create_game;
//     default:
//       return state;
//   }
// }

export function PlayerNameReducer(state=initialState.playerNames, action) {
  switch(action.type) {
    case 'player_names':
      const playerNames = Object.assign({}, action.data);
      return playerNames;
    default:
      return state;
  }
}
