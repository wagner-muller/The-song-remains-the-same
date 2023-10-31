const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')
const { sendResponse, generateToken } = require('./utils.js')

loginRouter.post('/', async (req, res) => {
  try {

    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email or password not found'
      })
    }

    const user = await User.findOne({ email })
      .populate('notifications')
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    const token = generateToken(user)
    return sendResponse(res, { ...user.toObject(), token })

  } catch (error) {
    console.error(`Login error: ${error}`)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = loginRouter