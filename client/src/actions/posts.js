import * as api from '../api/index.js'
import { FAVORITE, GET_FAVORITED_POSTS, GET_BY_SEARCH, COMMENT, START_LOADING, END_LOADING, RESET_POSTS, CREATE_POST, GET_POSTS, DELETE, LIKE, GET_POST } from '../constants/actionTypes'


export const createPost = (newPost, navigate) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.createPost(newPost)
    await dispatch({ type: CREATE_POST, payload: data })
    navigate(`/posts/${data._id}`)
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const commentPost = (value, id) => async(dispatch) => {
  try{
    const { data } = await api.commentPost(value,id)
    await dispatch({ type: COMMENT, payload: data })
    return data.comments
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const getPost = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getPost(id)
    dispatch({ type: GET_POST, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const getPosts = (page) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getPosts(page)
    dispatch({ type: GET_POSTS, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const getFavoritedPosts = (page) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getFavoritedPosts(page)
    dispatch({ type: GET_FAVORITED_POSTS, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING })
    const { data } = await api.getPostsBySearch(searchQuery)
    dispatch({ type: GET_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const deletePost = (id) => async(dispatch) => {
  try{
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const likePost = (id) => async(dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}

export const favoritePost = (id) => async(dispatch) => {
  try {
    const { data } = await api.favoritePost(id)
    dispatch({ type: FAVORITE, payload: data })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}
export const resetPosts = () => async(dispatch) => {
  try {
    dispatch({ type: RESET_POSTS })
  }catch(error){
    dispatch({ type: 'ERROR', error: error.message })
  }
}