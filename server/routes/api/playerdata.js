import express from 'express'
import { getStats, updateStats, addDeaths, updateBlasterBandana } from '../../controllers/playerstats-controller.js'
import { createGame, gameDetails, gameLimits, getGames, upload, currLeaderboard, gameStartTransfer, gameEndTransfer, currentGames, ongoingGame } from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/updateStats', updateStats)
router.post('/addDeaths', addDeaths)
router.post('/updateBlasterBandana', updateBlasterBandana)
router.post('/createGame', createGame, gameDetails, gameLimits)
router.post('/upload', upload)
router.get('/getGames', getGames)
router.get('/currLeaderboard', currLeaderboard)
router.post('/gameStartTransfer', gameStartTransfer)
router.post('/gameEndTransfer', gameEndTransfer)
router.get('/currentGames', currentGames)
router.get('/ongoingGame', ongoingGame)

export default router
