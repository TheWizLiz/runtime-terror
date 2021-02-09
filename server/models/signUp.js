/*
  Not implemented yet.
  Mongoose is used to model MongoDB objects by using Javascript Promises.
*/

import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String
})

const signUpInfo = mongoose.model('SignUp', postSchema)

export default signUpInfo
