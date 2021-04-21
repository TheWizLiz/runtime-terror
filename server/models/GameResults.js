import mongoose from 'mongoose'

const GameResultsSchema = new mongoose.Schema({
  game_id: { type: String, required: true },
  player_id: { type: String, required: true },
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  original_team: { type: String, required: true, default: 'Human' },
  end_team: { type: String, required: true, default: 'Human' },
  remaining_lives: { type: Number, default: 3 },
  winner: { type: Boolean, default: false },
  placement: { type: Number, default: -1 }
})

const GameResults = mongoose.model('GameResults', GameResultsSchema)

export default GameResults
