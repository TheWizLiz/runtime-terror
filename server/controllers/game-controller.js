import Game from '../models/Game.js'
import GameDesc from '../models/GameDesc.js'
import GameLimits from '../models/GameLimits.js'

export const createGame = async (req, res, next) => {
  // Get all inputs
  const { body } = req
  const { gameTitle, gameDate, gameTime, gameEnd } = body

  // Checking form values
  if (!gameTitle) {
    return res.send({
      success: false,
      message: 'Error: No title specified.'
    })
  } else if (!gameDate) {
    return res.send({
      success: false,
      message: 'Error: No date specified.'
    })
  } else if (!gameTime) {
    return res.send({
      success: false,
      message: 'Error: No time specified.'
    })
  } else if (!gameEnd) {
    return res.send({
      success: false,
      message: 'Error: No end time specified.'
    })
  }

  // Creating game object to insert
  const newGame = new Game()
  newGame.game_title = gameTitle
  // newGame.time_start = gameDate
  // newGame.time_end = gameEnd
  // CurrentGame: false (Default)

  const gameId = newGame._id

  // Adding game to database
  newGame.save((err, doc) => {
    if (err) {
      console.log('An error saving the game occurred (Game): ', err)
      return res.send({
        success: false,
        message: 'Error: Game not saved properly.'
      })
    }
    req.game_id = gameId
    next()
  })
}

export const gameDetails = async (req, res, next) => {
  const { body } = req
  const { game_id } = req
  const { gameDesc, gameLocation, gamePhoto, regStart, regEnd } = body

  GameDesc.find({ game_id: game_id }, (err, games) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error occurred.'
      })
    } else if (games.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Game already exists with given ID.'
      })
    }
  })

  const GameDetails = new GameDesc()

  // Registration Start will be set to Date.now() if no registration start date is selected.
  if (regStart) {
    GameDetails.registration_start = regStart
  }

  GameDetails.game_id = game_id
  GameDetails.location = gameLocation
  GameDetails.description = gameDesc
  GameDetails.photo = gamePhoto
  GameDetails.registration_deadline = regEnd

  GameDetails.save((err, doc) => {
    if (err) {
      console.log('An error saving the game occurred (GameDesc): ', err)
      return res.send({
        success: false,
        message: 'Error: GameDesc not saved properly.'
      })
    } else {
      console.log(doc)
    }
    next()
  })
}

export const gameLimits = async (req, res, next) => {
  const { body } = req
  const { game_id } = req
  const { playerLimit, playerLives, hoardeLimit, blasterLimit, bandanaLimit, wristbandLimit } = body

  const GameLimits = new GameLimits()

  GameLimits.game_id = game_id
  GameLimits.player_lives = playerLives
  GameLimits.player_limit = playerLimit
  GameLimits.hoarde_limit = hoardeLimit
  GameLimits.blaster_no = blasterLimit
  GameLimits.bandana_no = bandanaLimit
  GameLimits.writstband_no = wristbandLimit

  GameLimits.save((err, doc) => {
    if (err) {
      console.log('An error saving the game occurred (GameLimits): ', err)
      return res.send({
        success: false,
        message: 'Error: GameDesc not saved properly.'
      })
    } else {
      console.log(doc)
      return res.send({
        success: true,
        message: 'All Game information saved successfully.'
      })
    }
  })
}
