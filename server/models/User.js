/*
  Models are a way of structuring our MongoDB objects.
  Mongoose is an npm package which models MongoDB objects by using Javascript Promises.
*/
// Attribute  tokenSeed: { type: String, required: true, unique: true }

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, default: '' },
  lastname: { type: String, required: true, default: '' },
  username: { type: String, required: true, unique: true, default: '' },
  password: { type: String, required: true, default: '' },
  email: { type: String, required: true, unique: true, default: '' },
  phone_no: { type: String, required: true, unique: true },
  acctType: { type: String, default: 'player' },
  createdAt: { type: Date, default: Date.now() }
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
