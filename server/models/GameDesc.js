import mongoose from 'mongoose'

const GameDescSchema = new mongoose.Schema({
  game_id: { type: Number, required: true },
  location: { type: String, default: 'UF Campus' },
  description: { type: String, default: '' },
  // photo: { type: Buffer, contentType: String }
  registration_deadline: { type: Date, required: true }
})

const GameDesc = mongoose.model('GameDesc', GameDescSchema)

export default GameDesc
