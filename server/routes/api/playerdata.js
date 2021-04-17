import express from 'express'
import { getStats } from '../../controllers/playerstats-controller.js'
import { createGame, gameDetails, gameLimits, getGames, upload, currLeaderboard, gameStartTransfer, gameEndTransfer } from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/createGame', createGame, gameDetails, gameLimits)
router.post('/upload', upload)
router.get('/getGames', getGames)
router.get('/currLeaderboard', currLeaderboard)
router.post('/gameStartTransfer', gameStartTransfer)
router.post('/gameEndTransfer', gameEndTransfer)

export default router
