const bcrypt = require('bcrypt')
const loginGoogleRouter = require('express').Router()
const User = require('../models/userModel')
const { sendResponse, generateToken } = require('./utils.js')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

loginGoogleRouter.post('/', async (req,res) => {
  try {

    const { tokenId } = req.body

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const { email_verified, email, given_name, family_name } = ticket.getPayload()

    if (!email_verified) {
      return res.status(401).json({ error: 'Email not verified by Google' })
    }

    const user = await User.findOne({ email })
      .populate('notifications')

    if (!user) {

      const passwordHash = await bcrypt.hash(email, 10)
      const newUser = new User({ name: given_name, lastName:family_name, username: email,email, passwordHash })
      const savedUser = await newUser.save()
      const token = await generateToken(savedUser)
      return sendResponse(res, { ...savedUser.toObject(), token })

    }else{

      const token = await generateToken(user)
      return sendResponse(res, { ...user.toObject(), token })

    }

  } catch(error) {
    console.error(`Login error: ${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = loginGoogleRouter