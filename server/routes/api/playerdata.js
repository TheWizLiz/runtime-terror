import express from 'express'
import { getStats } from '../../controllers/playerstats-controller.js'

const router = express.Router()

router.get('/getStats', getStats)

export default router