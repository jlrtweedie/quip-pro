const initialState = {
  message: {
    message: ''
  },
  login: {
    login: false,
    account: {}
  },
  join_game: {
    join_game: false,
    game: {},
    player: {}
  },
  create_game: {
    account: {},
    game: {}
  },
  player_names: {
    player_names: []
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

export function CreateGameReducer(state = initialState.create_game, action) {
  switch (action.type) {
    case 'create_game':
      const create_game = Object.assign({}, action.data);
      return create_game;
    default:
      return state;
  }
}

export function PlayerNameReducer(state=initialState.player_names, action) {
  switch(action.type) {
    case 'player_names':
      const player_names = Object.assign({}, action.data);
      return player_names;
    default:
      return state;
  }
}