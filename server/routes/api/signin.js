import express from 'express'
import { getUsers, getUser, getAcct, createUser, deleteUser, loginUser, verifyUser, logoutUser, registerUser } from '../../controllers/user-controller.js'
import { getEmail, sendEmail, resetPassword } from '../../controllers/email-controller.js'

const router = express.Router()

// "Express" Application Code:
// GET and POST HTTP Requests
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/registration', registerUser)
router.post('/login', loginUser)
router.get('/verify', verifyUser)
router.get('/logout', logoutUser)
router.delete('/', deleteUser)
router.get('/getAcct', getAcct, getUser)
router.get('/email', getEmail)
router.post('/sendEmail', sendEmail)
router.post('/resetPassword', resetPassword)

export default router
