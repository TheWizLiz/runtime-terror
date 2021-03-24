import express from 'express'
<<<<<<< HEAD
import { getUsers, getUser, getAcct, createUser, deleteUser, loginUser, verifyUser, logoutUser } from '../../controllers/user-controller.js'
=======
import { getUsers, createUser, deleteUser, loginUser, verifyUser, logoutUser } from '../../controllers/user-controller.js'
import { getEmail, sendEmail, resetPassword } from '../../controllers/email-controller.js'
>>>>>>> main

const router = express.Router()

// "Express" Application Code:
// GET and POST HTTP Requests
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/verify', verifyUser)
router.get('/logout', logoutUser)
router.delete('/', deleteUser)
<<<<<<< HEAD
router.get('/getAcct', getAcct, getUser)
=======
router.get('/email', getEmail)
router.post('/sendEmail', sendEmail)
router.post('/resetPassword', resetPassword)
>>>>>>> main

export default router
