import mongoose from 'mongoose'

const GameImageSchema = new mongoose.Schema({
  game_id: { type: String, required: true },
  fileName: { type: String, required: true, default: 'default.jpg' },
  filePath: { type: String, required: true, default: '/images/uploads/default.jpg' }
})

const GameImage = mongoose.model('GameImage', GameImageSchema)

export default GameImage
