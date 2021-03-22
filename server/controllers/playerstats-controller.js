import PlayerStats from '../models/PlayerStats.js'

export const getStats = async (req, res) => {
  try {
    const { query } = req
    const { user, game } = query

    // console.log(user)
    // console.log(game)

    PlayerStats.find({ player_id: user, game_id: game }, (err, results) => {
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
