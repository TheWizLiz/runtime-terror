import mongoose from 'mongoose'

const RegistrationSchema = new mongoose.Schema({
  game_id: { type: String, required: true },
  player_id: { type: String, requred: true },
  blaster_id: { type: Number },
  bandana_id: { type: Number },
  notifications: { type: Boolean, default: false }
})

const RegistrationDetails = mongoose.model('RegistrationDetails', RegistrationSchema)

export default RegistrationDetails
