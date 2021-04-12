import express from 'express'
import { getStats, updateStats } from '../../controllers/playerstats-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.get('/updateStats', updateStats)

export default router