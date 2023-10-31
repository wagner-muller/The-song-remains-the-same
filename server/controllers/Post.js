const postsRouter = require('express').Router()
const Post = require('../models/postModel')
const User = require('../models/userModel')

const { getTokenFrom } = require('./utils.js')

postsRouter.get('/', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const following_users = user?.following?.map(following => following.toString())
    const ids = following_users.concat(decodedToken.id)

    const LIMIT = 5
    const skip = req.query.page ? LIMIT*(Number(req.query.page)-1) : 0

    const posts = await Post.find({ 'user': { $in: ids } })
      .sort({ createdAt: -1 }).limit(LIMIT)
      .skip(skip).populate('user', { name: 1 })

    const response = {
      page: req.query.page,
      posts: posts
    }

    res.cookie('token', decodedToken, { sameSite: 'None', secure: true })

    return res.status(200).json(response)

  } catch(error) {
    console.error(`Get posts error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

postsRouter.get('/favorited', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const LIMIT = 5
    const skip = req.query.page ? LIMIT*(Number(req.query.page)-1) : 0

    const posts = await Post.find({ 'favorited': decodedToken.id })
      .sort({ createdAt: -1 }).limit(LIMIT)
      .skip(skip).populate('user', { name: 1 })

    const response = {
      page: req.query.page,
      posts: posts
    }

    res.cookie('token', decodedToken, { sameSite: 'None', secure: true })
    return res.status(200).json(response)

  } catch(error) {
    console.error(`Get posts error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

postsRouter.put('/:id/comment', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = req.params
    const { comment } = req.body

    if (!comment) {
      return res.status(400).json({ error: 'Comment text is missing' })
    }

    const post = await Post.findById(id)
    post.comments.push(comment)
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json(updatedPost)

  } catch(error){{
    console.error(`Comment post error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

postsRouter.post('/', async(req,res) => {

  const post = req.body
  try{
    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const newPost = await Post.create({ ...post, user: user._id })

    const savedPost = await newPost.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    res.status(200).json(savedPost)

  } catch(error){{
    console.error(`Create post error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

postsRouter.delete('/:id', async(req,res) => {
  try{

    const deletedPost = await Post.findByIdAndRemove(req.params.id)

    if(!deletedPost){
      return res.status(404).json({ error: 'post not found' })
    }

    return res.status(204).end()

  } catch(error){{
    console.error(`Delete post error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

postsRouter.get('/search',async (req,res) => {
  try{
    const { tags = '' } = req.query
    const posts = await Post.find({ $or: [ { title:  { $regex: req.query.searchQuery } }, { tags: { '$in' : tags.split(',') } } ] }).populate('user', { name: 1 })
    res.json({ data: posts })
  }catch(error){
    console.error(error)
    res.status(404).json({ message: error.message })
  }
})

postsRouter.get('/:id', async(req,res) => {
  try{

    const { id } = req.params

    const post = await Post.findById(id).populate('user', { name: 1 })
    if(!post) return res.status(404).json({ error: 'post not found' })

    return res.status(200).json(post)

  } catch(error){{
    console.error(`Get post error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

postsRouter.put('/:id/favorite', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = req.params

    const post = await Post.findById(id).populate('user', { name: 1 })
    const user = await User.findById(decodedToken.id)

    const hasFavorited = post.favorited.findIndex((id) => id === String(user._id))
    if(hasFavorited === -1){
      post.favorited.push(user._id)
    }else{
      post.favorited = post.favorited.filter((id) => id !== String(user._id))
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json(updatedPost)

  } catch(error){{
    console.error(`Favorite post error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})



postsRouter.put('/:id/like', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = req.params
    const post = await Post.findById(id).populate('user', { name: 1 })
    const user = await User.findById(decodedToken.id)

    const hasLiked = post.likes.findIndex((id) => id === String(user._id))
    if(hasLiked === -1){
      post.likes.push(user._id)
    }else{
      post.likes = post.likes.filter((id) => id !== String(user._id))
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json(updatedPost)

  } catch(error){{
    console.error(`Like post error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

module.exports = postsRouter