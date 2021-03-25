import mongoose from 'mongoose'

const PlayerStatsSchema = new mongoose.Schema({
  game_id: { type: Number, required: true },
  player_id: { type: String, required: true },
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  team: { type: String, required: true, default: 'Human' },
  timeOfDeath: { type: Date, default: null }
})

const PlayerStats = mongoose.model('PlayerStats', PlayerStatsSchema)

export default PlayerStats
