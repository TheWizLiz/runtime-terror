import mongoose from 'mongoose'

const GameDescSchema = new mongoose.Schema({
  game_id: { type: String, required: true },
  location: { type: String, default: 'UF Campus' },
  description: { type: String, default: '' },
  registration_start: { type: Date, default: Date.now() },
  registration_deadline: { type: Date, required: true },
  ended: { type: Boolean, default: false }
})

const GameDesc = mongoose.model('GameDesc', GameDescSchema)

export default GameDesc
