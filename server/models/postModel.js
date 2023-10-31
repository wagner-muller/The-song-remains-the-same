const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  description:{
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true,
    required: true,
  },
  comments: {
    type: [String],
    default: []
  },
  likes: {
    type: [String],
    default: []
  },
  favorited: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  tags: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)
module.exports = Post