import express from 'express'
import { getStats } from '../../controllers/playerstats-controller.js'
import { createGame, gameDetails, gameLimits, getGames, upload } from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/createGame', createGame, gameDetails, gameLimits)
router.post('/upload', upload)
router.get('/getGames', getGames)

export default router