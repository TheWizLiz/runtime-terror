import express from 'express'
import { getStats, updateStats, addDeaths, changeTeam, updateBlasterBandana, currentPlayerStats } from '../../controllers/playerstats-controller.js'
import { createGame, gameDetails, gameLimits, getGames, upload, currLeaderboard, gameStartTransfer, gameEndTransfer, currentGames, ongoingGame, currPropBoard, checkGameStatus, findGameInfo} from '../../controllers/game-controller.js'

const router = express.Router()

router.get('/getStats', getStats)
router.post('/updateStats', updateStats)
router.post('/addDeaths', addDeaths)
router.post('/updateBlasterBandana', updateBlasterBandana)
router.post('/createGame', createGame, gameDetails, gameLimits)
router.post('/upload', upload)
router.get('/getGames', getGames)
router.get('/findGameInfo', findGameInfo)
router.get('/currLeaderboard', currLeaderboard)
router.get('/currPropBoard', currPropBoard)
router.get('/checkGameStatus', checkGameStatus)
router.post('/changeTeam', changeTeam)
router.get('/currentPlayerStats', currentPlayerStats)
router.post('/gameStartTransfer', gameStartTransfer)
router.post('/gameEndTransfer', gameEndTransfer)
router.get('/currentGames', currentGames, ongoingGame)

export default router
