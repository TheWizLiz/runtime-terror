import express from 'express'
import { getPosts } from '../controllers/posts.js'

const router = express.Router()

// Request and Response; Express Application Connection
router.get('/', getPosts)

export default router
