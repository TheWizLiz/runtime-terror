import Game from '../models/Game.js'
import GameDesc from '../models/GameDesc.js'
import GameLimits from '../models/GameLimits.js'

export const createGame = async (req, res, next) => {
  // Get all inputs
  const { body } = req
  const { gameTitle, gameDate, gameEnd } = body
  console.log('create game request ', gameEnd)

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
  } else if (!gameEnd) {
    return res.send({
      success: false,
      message: 'Error: No end time specified.'
    })
  }

  // Creating game object to insert
  const newGame = new Game()
  newGame.game_title = gameTitle
  newGame.time_start = gameDate
  newGame.time_end = gameEnd
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

  console.log('gameDetails', game_id)
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
  // GameDetails.photo = gamePhoto
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

  console.log('Wristbands', wristbandLimit)
  const GameL = new GameLimits()

  GameL.game_id = game_id
  GameL.player_lives = playerLives
  GameL.player_limit = playerLimit
  GameL.hoarde_limit = hoardeLimit
  GameL.blaster_no = blasterLimit
  GameL.bandana_no = bandanaLimit
  GameL.writstband_no = wristbandLimit

  GameL.save((err, doc) => {
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

export const getGames = async (req, res) => {
  /* { 
    title:
    description:
    registration_deadline:
    photo:
    location:
    playerlimit:
   } */
  let allGames = []
  let matchGames = []
  const gameIds = []

  await GameDesc.find({ 
    registration_start: { $lte: Date.now()}, 
    registration_deadline: { $gte: Date.now() }
  })
  .lean()
  .sort({ registration_deadline: 1 })
  .then(games => {
    for (let i = 0; i < games.length; i++) {
      allGames.push(games[i])
      gameIds.push(games[i].game_id)
    }
    console.log(gameIds)
  })
  .catch(err => {
    console.log('Something went wrong...', err)
    return res.send({
      success: false,
      message: 'Error: No active games found.',
    })
  })

  await Game.find({ _id: { $in: gameIds } })
    .lean()
    .then(foundGames => {
          // console.log(games)
      for (let i = 0; i < allGames.length; i++) {
        allGames.find((game, index) => {
          if (game.game_id == foundGames[i]._id.toString() ) {
            // console.log('FoundGame', foundGames[j])
            allGames[index].game_title = foundGames[i].game_title
            allGames[index].current_game = foundGames[i].current_game
            allGames[index].time_start = foundGames[i].time_start
            allGames[index].time_end = foundGames[i].time_end
          }
        })
      }

      console.log(allGames)
      return res.send({
        success: true,
        message: 'Active Games Found.',
        games: allGames
      })
    })

}