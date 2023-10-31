//const Notification = require('../models/Notification')
const notificationsRouter = require('express').Router()
const { getTokenFrom } = require('./utils.js')
const User = require('../models/userModel')
const Notification = require('../models/notificationModel.js')
var ObjectId = require('mongodb').ObjectId

notificationsRouter.get('/', async(req,res) => {
  try{

    const LIMIT = 15
    const notifications = req.query.notifications
    const notificationIds = notifications.map(notification => notification._id)

    const userNotifications = await Notification.find({
      _id: { $in: notificationIds }
    }).sort({ createdAt: -1 }).limit(LIMIT)
      .populate('sender', 'name picture')
      .populate('post', 'title')

    return res.status(200).json(userNotifications)

  } catch(error){{
    console.error(`Get notifications error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

notificationsRouter.put('/', async(req,res) => {
  try{

    const notifications = req.body
    const notificationIds = notifications.map(notification => notification._id)

    const userNotifications = await Notification.find({
      _id: { $in: notificationIds }
    })
    userNotifications.map(async (notification) => {
      notification.readed = true
      await Notification.findByIdAndUpdate(notification._id, notification, { new: true })
    })

    return res.status(200).json(userNotifications)

  } catch(error){{
    console.error(`Put notifications error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

notificationsRouter.post('/', async(req,res) => {

  const notification = req.body

  try {
    const decodedToken = getTokenFrom(req)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const receiver = await User.findById(notification.receiver)

    if (!user || !receiver) {
      return res.status(404).json({ error: 'User or receiver not found' })
    }

    if (user._id.toString() === receiver._id.toString()) {
      return res.status(400).json({ error: 'Sender and receiver cannot be the same' })
    }

    const newNotification = new Notification({
      sender: user._id,
      receiver: receiver._id,
      type: notification.type,
      post: notification.post
    })
    const savedNotification = await newNotification.save()

    const updatedReceiver = await User.findById(notification.receiver)
    updatedReceiver.notifications = updatedReceiver.notifications.concat(savedNotification._id)
    await updatedReceiver.save()

    res.status(200).json(savedNotification)

  } catch(error){{
    console.error(`Create notification error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

notificationsRouter.delete('/', async(req,res) => {

  const notification = req.body

  try{
    const decodedToken = getTokenFrom(req)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const senderId = new ObjectId(decodedToken.id)
    const receiverId = new ObjectId(notification.receiver)

    let deleteQuery = {
      'type': notification.type,
      'sender': senderId,
      'receiver': receiverId,
    }

    if (notification.post) {
      deleteQuery.post = new ObjectId(notification.post)
    }

    const deletedNotifications = await Notification.find(deleteQuery)

    if (deletedNotifications.length === 0) {
      return res.status(404).json({ error: 'notification not found' })
    }
    const deletedNotificationIds = deletedNotifications.map(doc => doc._id)

    await User.updateOne(
      { _id: notification.receiver },
      { $pullAll: { notifications: deletedNotificationIds } }
    )

    await Notification.deleteMany({ _id: { $in: deletedNotificationIds } })
    return

  } catch(error){{
    console.error(`Delete notification error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }}
})

module.exports = notificationsRouter