import express from 'express'
import { getStats } from '../../controllers/playerstats-controller.js'
import { createGame, gameDetails, gameLimits } from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/createGame', createGame, gameDetails, gameLimits)

export default router