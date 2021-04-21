import express from 'express'
import { getUsers, getRegisteredPlayers, getUser, getAcct, createUser, deleteUser, loginUser, updatePlayerAcc, updateAdminAcc, verifyUser, logoutUser, registerUser} from '../../controllers/user-controller.js'
import { getEmail, sendEmail, resetPassword } from '../../controllers/email-controller.js'

const router = express.Router()

// "Express" Application Code:
// GET and POST HTTP Requests
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/verify', verifyUser)
router.get('/logout', logoutUser)
router.delete('/deleteAccount', deleteUser)
router.post('/updatePlayerAcc', updatePlayerAcc)
router.post('/updateAdminAcc', updateAdminAcc)
router.get('/getAcct', getAcct, getUser)
router.get('/email', getEmail)
router.post('/sendEmail', sendEmail)
router.post('/resetPassword', resetPassword)
router.post('/registerUser', registerUser)
router.get('/getRegisteredPlayers', getRegisteredPlayers)

export default router