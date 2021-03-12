import express from 'express'
import { getUsers, createUser, deleteUser, loginUser, verifyUser, logoutUser } from '../../controllers/user-controller.js'

const router = express.Router()

// "Express" Application Code:
// GET and POST HTTP Requests
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/verify', verifyUser)
router.get('/logout', logoutUser)
router.delete('/', deleteUser)

export default router
