import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import conversationReducer from './reducers/conversationReducer'
import authReducer from './reducers/authReducer'
import { GoogleOAuthProvider } from '@react-oauth/google'
import  ChatProvider from './context/ChatProvider'
import UserProvider from './context/UserProvider'
import messageReducer from './reducers/messageReducer'


const store = configureStore({
  reducer:{
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    messages: messageReducer,
    notification: notificationReducer,
    conversation: conversationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserProvider>
      <ChatProvider>
        <GoogleOAuthProvider clientId="1026921384788-gi8416qgicnge55tv35c8hqm070ej98s.apps.googleusercontent.com">
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </ChatProvider>
    </UserProvider>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
