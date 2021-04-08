import express from 'express'
import { getStats } from '../../controllers/playerstats-controller.js'
import { createGame } from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/createGame', createGame)

export default router