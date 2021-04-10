import express from 'express'
import { getStats } from '../../controllers/playerstats-controller.js'
import { createGame, gameDetails, gameLimits, getGames } from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/createGame', createGame, gameDetails, gameLimits)
router.get('/getGames', getGames)

export default router