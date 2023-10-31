const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String
  },
  picture: {
    type: String,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
  bio: {
    type: String,
    trim: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Notification',
    default: []
  },
  conversationNotifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Conversation',
    default: []
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: []
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: []
  }],
  favoriteGenres: {
    type: [String],
    default: []
  },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
module.exports = User
