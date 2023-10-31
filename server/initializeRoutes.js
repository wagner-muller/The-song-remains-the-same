const loginRouter = require('./controllers/Login')
const loginGoogleRouter = require('./controllers/LoginGoogle')
const usersRouter = require('./controllers/User')
const postsRouter = require('./controllers/Post')
const notificationsRouter = require('./controllers/Notification')
const conversationsRouter = require('./controllers/Conversation')
const messageRouter = require('./controllers/Message')

const initializeRoutes = (app) => {
  app.use('/login', loginRouter)
  app.use('/logingoogle', loginGoogleRouter)
  app.use('/users', usersRouter)
  app.use('/messages', messageRouter)
  app.use('/notifications', notificationsRouter)
  app.use('/conversations', conversationsRouter)
  app.use('/posts', postsRouter)
}

module.exports = initializeRoutes