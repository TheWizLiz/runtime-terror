import mongoose from 'mongoose'

const GameLimitsSchema = new mongoose.Schema({
  game_id: { type: String, required: true },
  player_lives: { type: Number, required: true, default: 3 },
  player_limit: { type: Number, required: true, default: 3 },
  hoarde_limit: { type: Number, required: true, default: 100 },
  bandana_no: { type: Number, default: -1 },
  blaster_no: { type: Number, default: -1 },
  wristband_no: { type: Number, default: -1 }
})

const GameLimits = mongoose.model('GameLimits', GameLimitsSchema)

export default GameLimits
