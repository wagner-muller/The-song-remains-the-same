const messageRouter = require('express').Router()
const Message = require('../models/messageModel')
const User = require('../models/userModel')
const Conversation = require('../models/conversationModel')
const { getTokenFrom } = require('./utils.js')

messageRouter.post('/', async (req,res) => {
  try{

    const decodedToken = getTokenFrom(req)
    if(!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { text, conversationId } = req.body
    var newMessage = {
      sender: decodedToken.id,
      text: text,
      conversationId: conversationId
    }

    let message = await Message.create(newMessage)
    message = await message.populate('sender', 'name picture')
    message = await message.populate('conversationId')
    message = await User.populate(message,{
      path: 'conversation.users',
      select: 'name picture email'
    })

    await Conversation.findByIdAndUpdate(req.body.conversationId,{
      latestMessage: message
    })

    res.status(200).json(message)

  }catch(error){
    console.error(`Post message error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

messageRouter.get('/:id', async (req,res) => {
  try{

    const messages = await Message.find({
      conversationId: req.params.id
    })
      .populate('sender','name picture')
      .populate('conversationId')

    return res.status(200).json(messages)

  }catch(error){
    console.error(`Get message error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = messageRouter