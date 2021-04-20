import PlayerStats from '../models/PlayerStats.js'
import RegistrationDetails from '../models/RegistrationDetails.js'

export const getStats = async (req, res) => {
  try {
    const { query } = req
    const { user } = query

    PlayerStats.find({ player_id: user }, (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Player and Game combination not found.'
        })
      } else {
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

export const currentPlayerStats = async (req, res) => {
  const { username } = req.body

  const results = await PlayerStats.find({player_id: username})

  if (results) {
    return res.send({
      success: true,
      message: 'Player Loaded.',
    })
  } else {
    return res.send({
      success: false,
      message: 'Could not return current stats.'
    })
  }
}
  