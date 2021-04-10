import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  game_title: { type: String, required: true, default: 'Default Game Title' },
  current_game: { type: Boolean, required: true, default: false },
  time_start: { type: Date, required: true, default: Date.now() },
  time_end: { type: Date, required: true, default: Date.now() }
})

const Game = mongoose.model('Game', GameSchema)

export default Game
