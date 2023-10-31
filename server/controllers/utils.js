const jwt = require('jsonwebtoken')

exports.sendResponse = (res, user) => res.status(200).json({
  token: user.token,
  email: user.email,
  username: user.username,
  name: user.name,
  lastName: user.lastName,
  _id: user._id,
  posts: user.posts,
  followers: user.followers,
  following: user.following,
  picture: user.picture,
  favorites: user.favorites,
  bio: user.bio,
  conversationNotifications: user.conversationNotifications,
  notifications: user.notifications,
  favoriteGenres: user.favoriteGenres
})

exports.generateToken = (user) => {
  const userForToken = { email: user.email, id: user._id }
  const token = jwt.sign(userForToken, process.env.JWT_SECRET)
  return token
}

exports.getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (!authorization) {
    throw new Error('Authorization header is missing')
  }

  if (!authorization.toLowerCase().startsWith('bearer ')) {
    throw new Error('Authorization header is not in the correct format')
  }

  const token =  authorization.substring(7)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decodedToken
}
