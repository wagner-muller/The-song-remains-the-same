import * as api from '../api/index.js'
import { RESET_USERS, GET_USER,  START_LOADING, END_LOADING, GET_USERS_BY_SEARCH, UPDATE_USER } from '../constants/actionTypes'

export const getUser = ( id ) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getUser(id)
    dispatch({ type: GET_USER, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}


export const getUsersBySearch = ( searchQuery ) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getUsersBySearch(searchQuery)
    dispatch({ type: GET_USERS_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}



export const updateUser = (id,form, navigate) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })

    const { data } = await api.updateUser(id,form)

    dispatch({ type: UPDATE_USER, payload: data })

    dispatch({ type: END_LOADING })

    navigate(`/user/${data._id}`)

    dispatch({ type: END_LOADING })

  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const resetUsers = () => async(dispatch) => {
  try {
    dispatch({ type: RESET_USERS })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const followUser = (id) => async(dispatch) => {
  try{
    await api.followUser(id)
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}
