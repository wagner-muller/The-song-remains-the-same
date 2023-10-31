import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

//Auth
export const signIn = (form) => API.post('/login',form)
export const signInGoogle = (form) => API.post('logingoogle',form)
export const signUp = (form) => API.post('/users',form)
export const refreshUser = () => API.get('/users/current')

//Posts
export const createPost = (newPost) => API.post('/posts',newPost)
export const getPosts = (page) => API.get(`/posts?page=${page}`)
export const getFavoritedPosts = (page) => API.get(`/posts/favorited?page=${page}`)

export const getPost = (id) => API.get(`/posts/${id}`)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.put(`/posts/${id}/like`)
export const favoritePost = (id) => API.put(`posts/${id}/favorite`)
export const commentPost = (comment,id) => API.put(`/posts/${id}/comment`, { comment })
export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${searchQuery.tags || 'none'}`)

//Users
export const getUser = (id) => API.get(`/users/${id}`)
export const getUsersBySearch = (searchQuery) => API.get(`/users/search?searchQuery=${searchQuery || 'none'}`)
export const updateUser = (id, form) => API.put(`/users/${id}`, form)
export const followUser = (id) => API.put(`/users/${id}/follow`)

//Notifications
export const sendNotification = (newNotification) => API.post('/notifications',newNotification)
export const deleteNotification = (newNotification) => { API.delete('/notifications', { data: newNotification })}
export const getNotifications = (notifications) => API.get('/notifications', { params: { notifications } })
export const readNotifications = (notifications) => API.put('/notifications', notifications)

//Conversations
export const createGroupConversation = (newConversation) => API.post('/conversations/group', newConversation)
export const createConversation = (id) => API.post('/conversations', id)
export const fetchConversations = (id) => API.get(`/conversations/${id}`)
export const addUserConversation = (id,userId) =>  API.put('/conversations/groupAdd', id, userId)
export const removeUserGroup = (id,userId) => API.delete('/conversations/groupRemove', { data: { id, userId } })
export const renameConversation = (id,chatName) => API.put('/conversations/rename', id, chatName)


//Messages
export const sendMessage = (newMessage) => API.post('/messages',newMessage)
export const getMessages = (id) => API.get(`/messages/${id}`)
export const sendMessageNotification = (id, notificationId) => API.put(`/users/${id}/messages`, { notificationId })
export const deleteMessageNotification = (id, notificationId) => API.put(`/users/${id}/messagesDelete`, { notificationId })


