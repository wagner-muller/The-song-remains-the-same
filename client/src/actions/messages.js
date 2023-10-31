import * as api from '../api/index.js'
import {  START_LOADING, END_LOADING, SEND_MESSAGE, GET_MESSAGES } from '../constants/actionTypes'

export const sendMessage = ( newMessage ) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.sendMessage(newMessage)
    dispatch({ type: SEND_MESSAGE, payload: data })
    dispatch({ type: END_LOADING })
    return data
  }catch( error ){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const getMessages = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getMessages(id)
    dispatch({ type: GET_MESSAGES, payload: data })
    dispatch({ type: END_LOADING })
    return data
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

