import express from 'express'
import { getUsers, getUser, getAcct, createUser, deleteUser, loginUser, verifyUser, logoutUser } from '../../controllers/user-controller.js'
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
router.get('/getAcct', getAcct, getUser)
router.get('/email', getEmail)
router.post('/sendEmail', sendEmail)
router.post('/resetPassword', resetPassword)

export default router
