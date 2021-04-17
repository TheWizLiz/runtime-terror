// Imports for Server Application
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'

// Imports for Routes
import userRoutes from './routes/api/signin.js'
import inGameData from './routes/api/playerdata.js'

// Setup of Express and environmental variables
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL

// Used for post route to be reached by ex: localhost:5000/posts, not localhost:5000

app.use(express.json({ limit: '30mb', extended: true }), cors())
app.use(fileUpload())

app.use('/api/account', userRoutes)
app.use('/api/games', inGameData)

// Mongoose connection to MongoDB database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) })
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
