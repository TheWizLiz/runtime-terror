import mongoose from 'mongoose'

const UserSessionSchema = new mongoose.Schema({
  userId: { type: String, default: -1 },
  timestamp: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false }
})

const UserSession = mongoose.model('UserSession', UserSessionSchema)

export default UserSession
