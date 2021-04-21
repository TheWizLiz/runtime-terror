import PlayerStats from '../models/PlayerStats.js'
import GameResults from '../models/GameResults.js'
import RegistrationDetails from '../models/RegistrationDetails.js'
import Game from '../models/Game.js'

export const getStats = async (req, res) => {
  try {
    const { query } = req
    const { user } = query

    const games = []
    const ids = []
    await GameResults.find({ player_id: user })
      .lean()
      .then(results => {
        for (let i = 0; i < results.length; i++) {
          games.push(results[i])
          ids.push(results[i].game_id)
        }
      })
      .catch(err => {
        return res.send({
          success: false,
          message: 'Player and Game combination not found.',
          error: err
        })
      })

    await Game.find({ _id: { $in: ids } })
      .lean()
      .then(results => {
        for (let i = 0; i < ids.length; i++) {
          for (let j = 0; j < results.length; j++) {
            if (ids[i] === results[j]._id.toString()) {
              games[i].game_title = results[j].game_title
            }
          }
        }
        console.log('Full Game Data:', games)
        return res.send({
          success: true,
          message: 'Got user statistics',
          games: games
        })
        // res.send(JSON.stringify(games))
      })

  } catch {
    return res.send({
      success: false,
      message: 'User or Game not queried for... Server Error.'
    })
  }
}

export const updateStats = async (req, res) => {
  const { username } = req.body

  PlayerStats.findOneAndUpdate({player_id: username}, {$inc: { kills: 1 }}, (err, doc) => {
    if(err){
      return res.send({
        success: false,
        message: "An error has occured."
      })
    } else {
      return res.send({
        success: true,
        message: 'Kill added.'
      })
    }
  })
}

export const addDeaths = async (req, res) => {
  const { username } = req.body
  
  PlayerStats.findOneAndUpdate({player_id: username}, {$inc: {deaths: 1, remaining_lives: -1}}, (err, doc) => {
    if(err){
      return res.send({
        success: false,
        message: "An error has occured."
      })
    } else {
      return res.send({
        success: true,
        message: 'Kill added.'
      })
    }
  })
}

export const changeTeam = async (req, res) => {
  const { username } = req.body

  PlayerStats.findOneAndUpdate({player_id: username}, {$set: {current_team: "Zombie"}}, (err, doc) => {
    if(err){
      return res.send({
        success: false,
        message: "An error has occured."
      })
    } else {
      return res.send({
        success: true,
        message: 'Team updated.'
      })
    }
  })
}

export const updateBlasterBandana = async (req, res) => {
  const { username, blasterID, bandanaID } = req.body

  RegistrationDetails.findOneAndUpdate({player_id: username}, {$set: {blaster_id: blasterID, bandana_id: bandanaID }}, (err, doc) => {
    if(err){
      return res.send({
        success: false,
        message: "An error has occured.",
        error: err
      })
    } else {
      return res.send({
        success: true,
        message: 'Blaster and Bandana IDs updated.'
      })
    }
  })
}

export const currentPlayerStats = async (req, res) => {
  const { query } = req
  const { username } = query

  const results = await PlayerStats.find({ player_id: username })

  if (results) {
    if (results.length === 0) {
      return res.send({
        success: false,
        message: 'Player not in current game.',
        result: results
      })
    } else {
      return res.send({
        success: true,
        message: 'Player Loaded.',
        result: results
      })
    }
  } else {
    return res.send({
      success: false,
      message: 'Could not return current stats.'
    })
  }
}
