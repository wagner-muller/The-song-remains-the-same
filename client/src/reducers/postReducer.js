const postReducer = (state = { isLoading: true, posts: [] }, action) => {
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
  case 'CREATE_POST':
    return { ...state, post: action.payload }
  case 'GET_POSTS':
    return {
      ...state,
      posts: action.payload.page === 1 ? action.payload.posts : [...state.posts, ...action.payload.posts],

    }
  case 'GET_FAVORITED_POSTS':
    return {
      ...state,
      posts: action.payload.page === 1 ? action.payload.posts : [...state.posts, ...action.payload.posts],

    }
  //case 'COMMENT':
  //  console.log('hoi')
  //  return {
  //    ...state,
  //    posts: state.post.map((post) => {
  //      console.log(post)
  //      if(post._id === action.payload._id) return action.payload
  //      return post
  //    })
  //  }
  case 'RESET_POSTS':
    return {
      ...state,
      posts: []
    }
  case 'GET_BY_SEARCH':
    return {
      ...state,
      posts: action.payload.data
    }
  case 'GET_POST':
    return {
      ...state,
      post: action.payload,
    }
  case 'DELETE':
    return {
      ...state,
      posts: state.posts.filter((post) => post._id !== action.payload)
    }
  default:
    return state
  }
}

export default postReducer