import Game from '../models/Game.js'
import GameDesc from '../models/GameDesc.js'
import GameLimits from '../models/GameLimits.js'
import fileUpload from 'express-fileupload'
import GameImage from '../models/GameImage.js'
import PlayerStats from '../models/PlayerStats.js'
import RegistrationDetails from '../models/RegistrationDetails.js'
import GameResults from '../models/GameResults.js'

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
  // Find game ID of recently created game.
  console.log('gamePhoto', gamePhoto)

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

  const Image = new GameImage()
  Image.game_id = game_id

  if (Object.keys(gamePhoto).length !== 0) {
    console.log('GETS IN HERE...?', gamePhoto)
    Image.fileName = gamePhoto.fileName
    Image.filePath = gamePhoto.filePath
  } else {
    Image.fileName = 'default.jpg'
    Image.filePath = '/images/uploads/default.jpg'
  }

  Image.save((err, doc) => {
    if (err) {
      console.log('An error saving the game image occurred (GameDesc)', err)
      return res.send({
        success: false,
        message: 'Error: Photo not saved properly.'
      })
    }
  })

  // Registration Start will be set to Date.now() if no registration start date is selected.
  if (regStart) {
    GameDetails.registration_start = regStart
  }

  GameDetails.game_id = game_id
  GameDetails.location = gameLocation
  GameDetails.description = gameDesc
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
  GameL.wristband_no = wristbandLimit

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
        // , photo: gamePhotoUploaded
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
    registration_start: { $lte: Date.now() },
    registration_deadline: { $gte: Date.now() }
  })
    .lean()
    .sort({ registration_deadline: 1 })
    .then(games => {
      for (let i = 0; i < games.length; i++) {
        allGames.push(games[i])
        gameIds.push(games[i].game_id)
      }
      console.log('Game ID\'s', gameIds)
    })
    .catch(err => {
      console.log('Something went wrong...', err)
      return res.send({
        success: false,
        message: 'Error: No active games found.'
      })
    })

  await Game.find({ _id: { $in: gameIds } })
    .lean()
    .then(foundGames => {
      // console.log(games)
      for (let i = 0; i < allGames.length; i++) {
        allGames.find((game, index) => {
          if (game && game.game_id === foundGames[i]._id.toString()) {
            console.log('FoundGame', foundGames[i])
            allGames[index].game_title = foundGames[i].game_title
            allGames[index].current_game = foundGames[i].current_game
            allGames[index].time_start = foundGames[i].time_start
            allGames[index].time_end = foundGames[i].time_end
          }
        })
      }
    })

  await GameImage.find({ game_id: { $in: gameIds } })
    .lean()
    .then(foundGames => {
      for (let i = 0; i < allGames.length; i++) {
        // console.log('ALL GAMES', allGames)
        // console.log('FOUND GAMES', foundGames)
        allGames.find((game, index) => {
          if (game.game_id === foundGames[i].game_id) {
            // console.log('FoundGame', foundGames[j])
            allGames[index].fileName = foundGames[i].fileName
            allGames[index].filePath = foundGames[i].filePath
          }
        })
      }
    })

  // for (let i = 0; i < allGames.length; i++) {
  //   if (!allGames[i].fileName || !allGames[i].filePath) {
  //     allGames[i].fileName = 'default.jpg'
  //     allGames[i].filePath = '/images/uploads/default.jpg'
  //   }
  // }

  console.log(allGames)
  if (allGames.length > 0) {
    return res.send({
      success: true,
      message: 'Active Games Found.',
      games: allGames
    })
  } else {
    return res.send({
      success: false,
      message: 'Currently No Active Games.',
      games: allGames
    })
  }
}

export const upload = async (req, res) => {
// Image Uploading for Games.
  // console.log('here.')
  if (!req.files) {
    return res.json({
      success: false,
      message: 'File failed to upload'
    })
  }

  const file = req.files.file

  file.mv(`../../runtime-terror/client/public/images/uploads/${file.name}`, err => {
    if (err) {
      console.error('An error occured moving the file', err)
      return res.json({
        success: false,
        message: 'An error occured moving the file to the correct directory.'
      })
    }
    return res.json({
      success: true,
      message: 'file uploaded successfully.',
      fileName: file.name,
      filePath: `/images/uploads/${file.name}`
    })
  })
}

export const currLeaderboard = async (req, res) => {
  const results = await PlayerStats.find().sort({ kills: 'desc', deaths: 'asc', remaining_lives: 'desc' })

  if (results) {
    return res.send({
      success: true,
      message: 'Leaderboard Loaded.',
      leaderboard: results
    })
  } else {
    return res.send({
      success: false,
      message: 'Could not return leaderboard.'
    })
  }
}

export const currPropBoard = async (req, res) => {
  const results = await RegistrationDetails.find().sort({blaster_id: 'desc'})

  if (results) {
    return res.send({
      success: true,
      message: 'Property Board Loaded.',
      leaderboard: results
    })
  } else {
    return res.send({
      success: false,
      message: 'Could not return Property Board.'
    })
  }

}

export const checkGameStatus = async (req, res) => {
  const status = await Game.findOne({current_game: true})

  if (status) {
    return res.send({
      success: true,
      message: 'Game status recieved'
    })
  } else {
    return res.send({
      success: false,
      message: 'Could not retrive Game status'
    })
  }

export const gameStartTransfer = async (req, res) => {
  // Drop PlayerStats to clear out previous game's stats (NEED TO ADD)
  // Get GameID of started game
  // Find all players registered in the registration table
  // Get their playerid's and team from registration
  // Get Limits (PlayerLives) from GameLimits
  // Save all users into PlayerStats
  // Set Game to current_game: true
  const { body } = req
  const { game_id } = body
  const registeredPlayers = []
  let lives = 0

  // Need to retrieve game_id not title...
  await Game.findOneAndUpdate({ _id: game_id }, { current_game: true }, (err, game) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error finding game with specific game_id...',
        error: err
      })
    } else if (!game) {
      return res.send({
        success: false,
        message: 'No games found with associated ID.'
      })
    } else {
      console.log('Updated Current_Game to TRUE')
    }
  })

  // Find Lives for Game
  await GameLimits.findOne({ game_id: game_id }, (err, game) => {
    if (err) {
      return res.send({
        success: false,
        message: 'There was an error retrieving game limits',
        error: err
      })
    } else if (game) {
      lives = game.player_lives
      console.log('GAME DATA', game)
    }
    console.log('Player Lives for Game: ', lives)
  })

  await RegistrationDetails.find({ game_id: game_id })
    .lean()
    .then(players => {
      for (let i = 0; i < players.length; i++) {
        registeredPlayers.push({
          player_id: players[i].player_id,
          game_id: players[i].game_id,
          original_team: players[i].team,
          current_team: players[i].team,
          remaining_lives: lives
        })
      }
      console.log('Added players...', registeredPlayers)
    })
    .catch(err => {
      return res.send({
        success: false,
        message: 'There was an error retrieving registration details',
        error: err
      })
    })

  if (registeredPlayers.length > 0) {
    await PlayerStats.insertMany(registeredPlayers)
      .then(players => {
        console.log(players)
        return res.send({
          success: true,
          message: 'The entering process completed successfully'
        })
      })
      .catch(err => {
        console.log('ERROR HAS OCCURRED', err)
        return res.send({
          success: true,
          message: 'The entering process completed successfully.'
        })
      })
  } else {
    return res.send({
      success: false,
      message: 'No registered players to add into the game...'
    })
  }
}

export const gameEndTransfer = async (req, res) => {
  // When game ends...
  // Retrieve all player tuples with game_id O
  // Depending if they are on the correct team, update if they are winners. O
  // Grab placement from position they are in the array when retrieved O
  // Transfer all relevant players into gameResults.
  // Delete tuples out of PlayerStats with specific game_id...
  // Should drop table.. ?

  const { body } = req
  const { game_id, winner } = body
  const inGamePlayers = []

  // Change game to ended. current_game to false.
  await Game.findOneAndUpdate({ _id: game_id }, { current_game: false }, (err, game) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error setting current_game to false.'
      })
    } else if (!game) {
      return res.send({
        success: false,
        message: 'Game not found to be deleted.'
      })
    }
  })

  await GameDesc.findOneAndUpdate({ game_id: game_id }, { ended: true }, (err, game) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error setting game to ended.'
      })
    } else if (!game) {
      return res.send({
        success: false,
        message: 'Game not found to be deleted.'
      })
    }
  })

  // Grab Players in current game
  // Add additional attributes
  await PlayerStats.find({ game_id: game_id })
    .sort({ kills: 'desc', deaths: 'asc', remaining_lives: 'desc' })
    .then(players => {
      if (players.length === 0) {
        return res.send({
          success: false,
          message: 'No accounts found in current game.'
        })
      } else {
        for (let i = 0; i < players.length; i++) {
          let won = false

          if (players[i].original_team === winner) {
            won = true
          }

          inGamePlayers.push({
            player_id: players[i].player_id,
            game_id: players[i].game_id,
            kills: players[i].kills,
            deaths: players[i].deaths,
            original_team: players[i].original_team,
            end_team: players[i].current_team,
            remaining_lives: players[i].remaining_lives,
            winner: won,
            placement: (i + 1)
          })
        }
        console.log('Got players: ', inGamePlayers)
      }
    })
    .catch(err => {
      console.log('Caught Error finding players', err)
      return res.send({
        success: false,
        message: 'An error has occurred finding players in the current game',
        error: err
      })
    })

  // insert players into GameResults
  if (inGamePlayers) {
    await GameResults.insertMany(inGamePlayers)
      .then(players => {
        console.log('Entered players:', players)
      })
      .catch(err => {
        console.log('ERROR HAS OCCURRED', err)
        return res.send({
          success: false,
          message: 'The entering process not completed successfully.'
        })
      })
  } else {
    return res.send({
      success: false,
      message: 'No accounts found in PlayerStats in game.'
    })
  }

  await PlayerStats.deleteMany({ game_id: game_id }, (err, doc) => {
    if (err) {
      return res.send({
        success: false,
        message: 'There was an error removing accounts from PlayerStats',
        error: err
      })
    } else if (doc.deletedCount === 0) {
      return res.send({
        success: false,
        message: 'No accounts to remove found...'
      })
    } else {
      console.log(`Removed ${doc.deletedCount} accounts`)
      return res.send({
        success: true,
        message: 'Accounts Deleted. Everything completed successfully.'
      })
    }
  })
}

// Used for seeing which games are past the registration phase but have not started.
export const currentGames = async (req, res, next) => {
  // Get games that are past the registration deadline and have not ended yet.
  // Ended = false
  const currGames = []

  await GameDesc.find({ ended: false, registration_deadline: { $lte: Date.now() } })
    .lean()
    .then(games => {
      for (let i = 0; i < games.length; i++) {
        currGames.push(games[i].game_id)
      }
      console.log('Current Games:', currGames)
    })
    .catch(err => {
      return res.send({
        success: false,
        message: 'Error finding games which haven\'t occurred yet.',
        error: err
      })
    })

  if (currGames.length !== 0) {
    await Game.find({ _id: { $in: currGames } })
      .lean()
      .then(games => {
        console.log('Retrieved Game Data...', games)
        req.games = games
      })
      .catch(err => {
        console.log('Error finding games which were in game details.', err)
        return res.send({
          success: false,
          message: 'Error finding games from gamedetails.',
          error: err
        })
      })
  } else {
    req.games = []
  }
  next()
}

export const ongoingGame = async (req, res) => {
  const { games } = req
  console.log('GAMES.REQ', games)

  await Game.findOne({ current_game: true })
    .lean()
    .then(game => {
      if (game) {
        console.log()
        return res.send({
          success: true,
          message: 'Found the ongoing game',
          current_game: game,
          games: games
        })
      } else {
        return res.send({
          success: false,
          message: 'No ongoing games found...',
          current_game: '',
          games: games
        })
      }
    })
    .catch(err => {
      return res.send({
        success: false,
        message: 'Error finding games with current_game = true',
        error: err,
        current_game: '',
        games: games
      })
    })
}
