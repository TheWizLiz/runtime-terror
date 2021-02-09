// Add Route functions for Routes.js here to keep code clean.
// HTTP Status Codes: https://www.restapitutorial.com/httpstatuscodes.html
import SignUp from '../models/signUp.js'

export const getPosts = async (req, res) => {
  try {
    const signUps = await SignUp.find()
    console.log(signUps)
    res.status(200).json(signUps)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new SignUp(post)

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
