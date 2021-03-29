import mongoose from 'mongoose'

const RegistrationSchema = new mongoose.Schema({
  game_id: { type: Number, required: true },
  player_id: { type: Number, requred: true },
  blaster_id: { type: Number },
  bandana_id: { type: Number },
  notifications: { type: Boolean, default: false }
})

const RegistrationDetails = mongoose.model('RegistrationDetails', RegistrationSchema)

export default RegistrationDetails
