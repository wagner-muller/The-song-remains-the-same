import * as api from '../api/index.js'
import { AUTH, REFRESH_USER, START_LOADING, END_LOADING, REFRESH_MESSAGES } from '../constants/actionTypes'

export const signIn = (form) => async(dispatch) => {
  try{
    const { data } = await api.signIn(form)
    await dispatch({ type: AUTH, data })
  }catch(error){
    return error.response.data.error
  }
}

export const signInGoogle = (form) => async(dispatch) => {
  try{
    const { data } = await api.signInGoogle(form)
    await dispatch({ type: AUTH, data })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const signUp = (form, setIsSignUp) => async() => {
  try{
    await api.signUp(form)
    setIsSignUp(false)
  }catch(error){
    return error.response.data.error
  }
}

export const refreshUser = () => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })

    const { data } = await api.refreshUser()

    dispatch({ type: REFRESH_USER, payload: data })

    dispatch({ type: END_LOADING })

  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const refreshMessageNotifications = () => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })

    const { data } = await api.refreshUser()
    dispatch({ type: REFRESH_MESSAGES, payload: data })
    dispatch({ type: END_LOADING })

  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}
