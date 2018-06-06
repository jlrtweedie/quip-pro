const initialState = {
  message: {
    message: null
  },
  login: {
    account: null,
    game: null
  },
  joinGame: {
    game: null,
    player: null
  },
  playerNames: {
    names: null
  },
  gameState: {
    phase: null,
    waiting: null,
    prompt: null,
    answers: null,
    votes: null,
    scores: null
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
      const logout = Object.assign({}, action.data);
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
    case 'leave_game':
      const leaveGame = Object.assign({}, action.data);
      return leaveGame;
    default:
      return state;
  }
}

export function PlayerNameReducer(state=initialState.playerNames, action) {
  switch(action.type) {
    case 'player_names':
      const playerNames = Object.assign({}, action.data);
      return playerNames;
    default:
      return state;
  }
}

export function GameStateReducer(state=initialState.gameState, action) {
  switch(action.type) {
    case 'ready':
      const ready = Object.assign({}, action.data);
      return ready;
    case 'answering':
      const answering = Object.assign({}, action.data);
      return answering;
    case 'voting':
      const voting = Object.assign({}, action.data);
      return voting;
    case 'scoring':
      const scoring = Object.assign({}, action.data);
      return scoring;
    case 'end_game':
      const endGame = Object.assign({}, action.data);
      return endGame;
    default:
      return state;
  }
}
