const postReducer = (state = { isLoading: true, notifications: [] }, action) => {
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
  case 'GET_NOTIFICATIONS':
    return {
      ...state,
      notifications: action.payload,
    }
  case 'EMPTY_NOTIFICATIONS':
    console.log('hei')
    return {
      ...state,
      notifications: [],
    }
  case 'READ_NOTIFICATIONS':
    return {
      ...state,
      notifications: state.notifications.map((notification) => {
        notification.readed = true
        return notification
      })
    }

  default:
    return state
  }
}

export default postReducer