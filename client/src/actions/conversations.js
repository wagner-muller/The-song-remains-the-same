import * as api from '../api/index.js'
import { START_LOADING, END_LOADING, FETCH_CONVERSATIONS, ADD_USER_CONVERSATION, RENAME_CONVERSATION, DELETE_USER_GROUP } from '../constants/actionTypes'

export const getConversations = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchConversations(id)
    dispatch({ type: FETCH_CONVERSATIONS, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const addUserConversation = (id, userId) => async(dispatch) => {
  try {
    const { data } = await api.addUserConversation(id,userId)
    dispatch({ type: ADD_USER_CONVERSATION, payload: data })
    return data
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const removeUserGroup = ({ id, userId }) => async(dispatch) => {
  try{
    const { data } = await api.removeUserGroup(id,userId)
    dispatch({ type: DELETE_USER_GROUP, payload: data })
    return data
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const renameConversation = (id, chatName) => async(dispatch) => {
  try {
    const { data } = await api.renameConversation(id,chatName)
    dispatch({ type: RENAME_CONVERSATION, payload: data })
    return data
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const createGroupConversation = ( newConversation ) => async (dispatch) => {
  try{
    await api.createGroupConversation(newConversation)
  }catch( error ){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const createConversation = ( id ) => async (dispatch) => {
  try{
    const { data } = await api.createConversation(id)
    return data
  }catch( error ){
    dispatch({ type: 'ERROR', error: error.message })
  }
}