const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const initializeRoutes = require('./initializeRoutes')
const initializeSocket = require('./initializeSocket')

dotenv.config()

const app = express()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

app.use(express.json({ limit: '30mb', extended: true }))
app.use(cors())
initializeRoutes(app)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


initializeSocket(server)