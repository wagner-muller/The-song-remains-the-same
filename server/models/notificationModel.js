const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  type:{
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  readed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification