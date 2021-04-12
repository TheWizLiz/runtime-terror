import express from 'express'
import { getStats, updateStats, addDeaths } from '../../controllers/playerstats-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/updateStats', updateStats)
router.post('/addDeaths', addDeaths)

export default router