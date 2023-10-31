
import * as api from '../api/index.js'
import { START_LOADING, END_LOADING, GET_NOTIFICATIONS, READ_NOTIFICATIONS } from '../constants/actionTypes'
import socket from '../utils/SocketManager.js'

export const sendNotification = (newNotification) => async(dispatch) => {
  try{
    await api.sendNotification(newNotification)
    socket.emit('new notification',newNotification)
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const sendMessageNotification = (id, newNotification) => async(dispatch) => {
  try{
    await api.sendMessageNotification(id, newNotification)
    return
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const deleteMessageNotification = (id, newNotification) => async(dispatch) => {
  try{
    await api.deleteMessageNotification(id, newNotification)
    return
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const deleteNotification = (newNotification) => async(dispatch) => {
  try{
    await api.deleteNotification(newNotification)
    socket.emit('delete notification',newNotification)
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const getNotifications = (notifications) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getNotifications(notifications)
    dispatch({ type: GET_NOTIFICATIONS, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const readNotifications = (notifications) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.readNotifications(notifications)
    dispatch({ type: READ_NOTIFICATIONS, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}