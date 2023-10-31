const usersRouter = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { getTokenFrom } = require('./utils.js')
const cloudinary = require('../utils/cloudinary')

usersRouter.get('/', async(req,res) => {
  try{

    const users = await User.find({}).populate('posts', { title: 1, likes: 1 })

    return res.status(200).json(users)

  } catch(error) {
    console.error(`Get users error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.get('/current', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
      .populate('notifications')

    return res.status(200).json(user)

  } catch(error) {
    console.error(`Get users error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.get('/search', async (req,res) => {
  try{

    const users = await User.find({
      $or: [
        { name: { $regex: req.query.searchQuery } },
        { lastname: { $regex: req.query.searchQuery } },
        { username: { $regex: req.query.searchQuery } }
      ],
    }).populate('posts', { title: 1, likes: 1, url: 1 })

    res.status(200).json({ data: users })

  } catch(error){
    console.error(`Search users error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.get('/:id', async (req, res) => {
  try {

    const { id } = req.params

    const user = await User.findById(id).populate('posts', {
      title: 1,
      likes: 1,
      description: 1,
      url: 1
    }).populate('followers', {
      name: 1,
      picture: 1,
    }).populate('following', {
      name: 1,
      picture: 1,
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json(user)

  } catch (error) {
    console.error(`Single user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})


usersRouter.delete('/:id', async(req,res) => {
  try{

    const { id } = req.params
    const deletedUser = await User.findByIdAndRemove(id)
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(204).end()

  } catch(error){
    console.error(`Delete user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.post('/', async(req,res) => {
  try{

    const { name, lastName, username, email, password } = req.body
    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const userExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ error: 'Username already in use.' })
    }

    if (emailExists) {
      return res.status(400).json({ error: 'E-mail already in use.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ name, lastName, email, username, passwordHash })
    const newUser = await user.save()

    return res.status(201).json(newUser)

  } catch(error){
    console.error(`Create user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.put('/:id', async(req,res) => {
  try{

    const { id } = req.params
    const { name, lastName, username, email, favoriteGenres, bio, picture } = req.body

    const result = await cloudinary.uploader.upload(picture,{
      folder: 'profile',
      width: 300
    })

    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      lastName,
      email,
      username,
      favoriteGenres,
      bio,
      picture: result.secure_url
    }, { new: true })

    res.status(200).json(updatedUser)

  } catch(error){
    console.error(`Update user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})


usersRouter.put('/:id/messages', async (req,res) => {
  try{

    const { id } = req.params
    const { notificationId } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.conversationNotifications.push(notificationId)
    await user.save()

    return res.status(200).json(user)

  } catch(error){
    console.error(`User notification error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})


usersRouter.put('/:id/messagesDelete', async (req,res) => {
  try{

    const { id } = req.params
    const { notificationId } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.conversationNotifications = user.conversationNotifications.filter((notification) => notification.toString() !== notificationId)
    await user.save()

    return res.status(200).json(user)

  } catch(error){
    console.error(`User notification error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

//usersRouter.put('/:id/online', async(req,res) => {
//  const updatedUser = await User.findById(id, { new: true })
//})

usersRouter.put('/:id/follow', async (req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = req.params
    const user = await User.findById(decodedToken.id)
    const followUser = await User.findById(id)

    const isFollowing = user.following.some((user) => user.toString()===followUser._id.toString())

    if (!isFollowing) {
      followUser.followers.push(decodedToken.id)
      user.following.push(followUser._id)
    } else {
      followUser.followers = followUser.followers.filter((follower) => follower.toString() !== decodedToken.id)
      user.following = user.following.filter((following) => following.toString() !== followUser._id.toString())
    }

    const [updatedFollowedUser, updatedFollowingUser] = await Promise.all([followUser.save(), user.save()])

    res.status(200).json({ updatedFollowedUser, updatedFollowingUser })

  } catch(error){
    console.error(`Follow user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = usersRouter