import express from 'express'
import { getStats, updateStats, addDeaths, updateBlasterBandana } from '../../controllers/playerstats-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/updateStats', updateStats)
router.post('/addDeaths', addDeaths)
router.post('/updateBlasterBandana', updateBlasterBandana)

export default router