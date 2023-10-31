const conversationsRouter = require('express').Router()
const Conversation = require('../models/conversationModel')
const User = require('../models/userModel')
const { getTokenFrom } = require('./utils.js')

conversationsRouter.post('/', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = req.body

    let isConversation = await Conversation.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: id } } },
        { users: { $elemMatch: { $eq: decodedToken.id } } },
      ],
    })

    if(isConversation.length >0){
      res.send(isConversation[0])

    }else{

      const conversationData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [id, decodedToken.id]
      }

      const createdConversation = await Conversation.create(conversationData)

      res.status(200).json(createdConversation)
    }
  }catch(error){
    console.error(`Create conversation error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

conversationsRouter.get('/:id', async(req,res) => {
  try{

    const conversations = await Conversation.find({
      users: { $in: [req.params.id] }
    }).populate('users', '-password').sort({ updatedAt:-1  })

    res.status(200).json(conversations)

  }catch(error){
    console.error(`Get conversation error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

conversationsRouter.post('/group', async(req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    var users = JSON.parse(req.body.users)

    if(users.length < 2){
      return res.status(500).json('More than 2 users are required for group chats')
    }

    const user = await User.findById(decodedToken.id)
    users.push(user._id.toString())

    const groupConversation = await Conversation.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: user
    })

    const fullGroupConversation = await Conversation.findOne({ _id: groupConversation._id })
      .populate('users')
      .populate('groupAdmin')

    res.status(200).json(fullGroupConversation)

  }catch(error){
    console.error(`Group conversation error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

conversationsRouter.put('/rename', async(req,res) => {
  try{

    const { id, chatName } = req.body

    const updatedConversation = await Conversation.findByIdAndUpdate(
      id,
      { chatName: chatName },
      { new: true }
    ).populate('users')

    return res.status(200).json(updatedConversation)

  }catch(error){
    console.error(`Rename conversation error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

conversationsRouter.put('/groupAdd', async(req,res) => {
  try{

    const { id, userId } = req.body

    const updatedConversation = await Conversation.findByIdAndUpdate(
      id,
      { $push: { users: userId } },
      { new: true }
    ).populate('users')

    return res.status(200).json(updatedConversation)

  }catch(error){
    console.error(`Add user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

conversationsRouter.delete('/groupRemove', async(req,res) => {
  try{

    const { id, userId } = req.body

    const updatedConversation = await Conversation.findByIdAndUpdate(
      id,
      { $pull: { users: userId } },
      { new: true }
    ).populate('users')

    return res.status(200).json(updatedConversation)

  }catch(error){
    console.error(`Remove user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

conversationsRouter.delete('/:id', async(req,res) => {
  try{

    const deletedConversation = await Conversation.findByIdAndRemove(req.params.id)

    if(!deletedConversation){
      return res.status(404).json({ error: 'conversation not found' })
    }

    return res.status(204).end()

  }catch(error){
    console.error(`Remove user error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = conversationsRouter