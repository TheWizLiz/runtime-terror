import mongoose from 'mongoose'

const GameDetailsSchema = new mongoose.Schema({
// image: { data: Buffer,  contentType: String }
// ADD IMAGES. MAY NEED NEW SCHEMA TO DO SO AND REFERENCE THE FILE IN THIS CLASS
  game_id: { type: Number, required: true },
  description: { type: String },
  total_kills: { type: Number, default: 0 },
  player_count: { type: Number, default: 0 },
  timeStart: { type: Date, default: Date.now() },
  timeEnd: { type: Date },
  registration_limit: { type: Number },
  team_limit: { type: Number },
  location: { type: String, default: 'UF Campus' }
})

const GameDetails = mongoose.model('GameStats', GameDetailsSchema)

export default GameDetails
