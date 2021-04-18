import PlayerStats from '../models/PlayerStats.js'
import GameResults from '../models/GameResults.js'
import RegistrationDetails from '../models/RegistrationDetails.js'

export const getStats = async (req, res) => {
  try {
    const { query } = req
    const { user } = query

    // console.log(user)
    // console.log(game)

    GameResults.find({ player_id: user }, (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Player and Game combination not found.'
        })
      } else {
        // console.log(results)
        res.send(JSON.stringify(results))
      }
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
  
  PlayerStats.findOneAndUpdate({player_id: username}, {$inc: {deaths: 1}, $set: {current_team: "Zombie"}}, (err, doc) => {
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
  