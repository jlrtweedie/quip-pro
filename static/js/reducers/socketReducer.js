const initialState = {
  data: ''
}

function SocketReducer(state = initialState, action) {
  switch(action.type) {
    case 'TEST_REQUEST':
      let request = Object.assign({}, state, {
        outbound: action.outbound
      })
      return request
    case 'TEST_RESPONSE':
      let response = Object.assign({}, state, {
        inbound: action.inbound
      })
      return response
    default:
      return state
  }
}

export default SocketReducer
