const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  conversationId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text:{
    type: String,
    trim: true
  }
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message