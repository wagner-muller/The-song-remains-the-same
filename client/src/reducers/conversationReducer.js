const conversationReducer = (state = { isLoading: true, conversations: [] }, action) => {
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
  case 'FETCH_CONVERSATIONS':
    return {
      ...state,
      conversations: action.payload,
    }
  case 'ADD_USER_CONVERSATION':
    return {
      ...state,
      conversation: action.payload
    }
  case 'RENAME_CONVERSATION':
    return {
      ...state,
      conversation: action.payload
    }
  case 'DELETE_USER_GROUP':
    return {
      ...state,
      conversation: action.payload }

  default:
    return state
  }

}

export default conversationReducer