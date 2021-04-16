import mongoose from 'mongoose'

const PlayerStatsSchema = new mongoose.Schema({
  game_id: { type: String, required: true },
  player_id: { type: String, required: true },
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  original_team: { type: String, required: true, default: 'Human' },
  current_team: { type: String, required: true, default: 'Human' },
  time_of_death: { type: Date, default: null },
  remaining_lives: { type: Number, default: 3 }
})

const PlayerStats = mongoose.model('PlayerStats', PlayerStatsSchema)

export default PlayerStats
