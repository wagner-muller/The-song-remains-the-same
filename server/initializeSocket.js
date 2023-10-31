

const socketIO = require('socket.io')
const User = require('./models/userModel')

let onlineUsers = []

function initializeSocket(server) {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: 'http://localhost:3000'
    }
  })

  io.on('connection', (socket) => {
    console.log('connected to socket')
    socket.on('setup', async (userData) => {
      socket.join(userData._id)
      onlineUsers.push({ userData, socketId: socket.id })
      await User.findByIdAndUpdate(userData._id,{ isOnline: true },)
      socket.emit('connected')
    })
    socket.on('disconnect', async () => {
      const offUser = onlineUsers.find((user) => user.socketId === socket.id)
      await User.findByIdAndUpdate(offUser?.userData?._id,{ isOnline: false },)
      onlineUsers.filter((user) => user.socketId !== socket.id)
      console.log(`${socket.id} disconnected`)
    })
    socket.on('new notification', (newNotification) => {
      socket.in(newNotification.receiver).emit('notification received', newNotification)
    })
    socket.on('delete notification', (newNotification) => {
      socket.in(newNotification.receiver).emit('notification deleted', newNotification)
    })

    socket.on('typing', (room) => { socket.in(room).emit('typing')})
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))
    socket.on('join chat', (room) => {
      socket.join(room)
      console.log(`User joined room ${room}`)
    })
    socket.on('new message', (newMessageReceived) => {
      const conversation = newMessageReceived.conversationId
      if (!conversation.users) return console.log('conversation.users is not defined')
      conversation.users.forEach(async (user) => {
        if(user === newMessageReceived.sender._id) return
        const userNotified = await User.findById(user)
        if(!userNotified.conversationNotifications.some((notification) => notification.toString() === newMessageReceived.conversationId._id.toString())){
          userNotified.conversationNotifications.push(newMessageReceived.conversationId._id)
          await User.findByIdAndUpdate(user, userNotified, { new: true })
        }
        if(onlineUsers.some((onlineUser) => onlineUser.userData._id === user)){
          socket.in(user).emit('message received', newMessageReceived)
        }
      })
    })
    socket.on('new conversation', () => { io.emit('new conversation')})
  })
}

module.exports = initializeSocket