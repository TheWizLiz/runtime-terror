import express from 'express'
import { getPosts, createPost } from '../controllers/posts.js'

const router = express.Router()

// "Express" Application Code:
// GET and POST HTTP Requests
router.get('/', getPosts)
router.post('/', createPost)

export default router
