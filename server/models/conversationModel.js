const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
  chatName:{
    type: String
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  users:{
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'User'
  },
  muted: {
    type: Boolean,
    default: false
  },
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation