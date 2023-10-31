const messageReducer = (state = { isLoading: true, messages: [] }, action) => {
  switch(action.type){
  case 'START_LOADING':
    return {
      ...state,
      isLoading: true
    }
  case 'END_LOADING':
    return {
      ...state,
      isLoading: false
    }
  case 'SEND_MESSAGE':
    return { ...state, message: action.payload }
  case 'GET_MESSAGES':
    return {
      ...state,
      messages: action.payload,
    }

  default:
    return state
  }
}

export default messageReducer