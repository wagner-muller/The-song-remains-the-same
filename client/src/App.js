import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Authentication/Auth'
import Main from './components/Main/Main'
import Messages from './components/Messages/Messages'
import Search from './components/Search/Search'
import Saved from './components/Saved/Saved'
import PostPage from './components/PostPage/PostPage'
import User from './components/User/User'
import ProfileForm from './components/ProfileForm/ProfileForm'
import React from 'react'
import { UserState } from './context/UserProvider'


function App() {
  const { loggedIn } = UserState()

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh' }}>
        {loggedIn ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/main" />} />
              <Route path="/main" exact element={<Main />}/>
              <Route path="/search" exact element={<Search />}/>
              <Route path="/saved" exact element={<Saved />}/>
              <Route path="/messages" exact element={<Messages />}/>
              <Route path="/posts/:id" exact element={<PostPage />} />
              <Route path="/user/:id" exact element={<User />} />
              <Route path="/user/:id/change" exact element={<ProfileForm />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
