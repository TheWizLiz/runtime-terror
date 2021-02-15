/*
  Models are a way of structuring our MongoDB objects.
  Mongoose is an npm package which models MongoDB objects by using Javascript Promises.
  Not implemented yet. Below is an example schema.
*/

import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String
})

const SignUp = mongoose.model('SignUp', postSchema)

export default SignUp
