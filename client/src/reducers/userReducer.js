const userReducer = (state = { isLoading: true, users: [] }, action) => {
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
  case 'GET_USER':
    return {
      ...state,
      user: action.payload,
    }
  case 'RESET_USERS':
    return {
      ...state,
      users: []
    }
  case 'GET_USERS_BY_SEARCH':
    return {
      ...state,
      users: action.payload.data
    }
  case 'UPDATE_USER': {
    const user = JSON.parse(localStorage.getItem('profile'))
    user.name = action.payload.name
    localStorage.setItem('profile',JSON.stringify({ ...user }))
    return {
      ...state,
      user: action.payload.data,
    }
  }
  case 'FAVORITE_USER': {
    const user = JSON.parse(localStorage.getItem('profile'))
    user.name = action.payload.name
    localStorage.setItem('profile',JSON.stringify({ ...user }))
    return {
      ...state,
      user: action.payload.data,
    }
  }
  case 'REFRESH_USER': {
    const user = JSON.parse(localStorage.getItem('profile'))
    user.notifications = action.payload.notifications
    user.conversationNotifications = action.payload.conversationNotifications
    localStorage.setItem('profile',JSON.stringify({ ...user }))
    return {
      ...state,
      user: action.payload.data,
    }
  }
  case 'REFRESH_MESSAGES': {
    const user = JSON.parse(localStorage.getItem('profile'))
    user.conversationNotifications = action.payload.conversationNotifications
    localStorage.setItem('profile',JSON.stringify({ ...user }))
    return {
      ...state,
      user: action.payload.data,
    }
  }


  default:
    return state
  }
}

export default userReducer