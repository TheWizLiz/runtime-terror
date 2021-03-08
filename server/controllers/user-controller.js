// Add Route functions for routes/posts.js here to keep code clean.
// (req, res)
// HTTP Status Codes: https://www.restapitutorial.com/httpstatuscodes.html
import User from '../models/User.js'
import UserSession from '../models/UserSession.js'

// Retrieve all users
export const getUsers = async (req, res) => {
  try {
    // Find all users
    const Users = await User.find()
    console.log(Users)
    res.status(200).json(Users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Signing Up
export const createUser = async (req, res) => {
  const { body } = req
  const { username, password } = body
  let { email } = body

  if (!username) {
    return res.send({
      success: false,
      message: 'Username cannot be blank'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Password cannot be blank'
    })
  }

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: email cannot be blank'
    })
  }

  email = email.toLowerCase()

  // Need to extend verification to usernames as well.
  User.find({ email: email }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: server error. (1e)'
      })
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'An account with this email adress already exists.'
      })
    }

    const newUser = new User()

    newUser.email = email
    newUser.username = username
    newUser.password = newUser.generateHash(password)

    // console.log(newUser)
    newUser.save((err, user) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Error: server error. (2)'
        })
      }
      return res.send({
        success: true,
        message: 'Signed Up Successfully.'
      })
    })
  })
}

// Signing In...
export const loginUser = async (req, res) => {
  const { body } = req
  const { password } = body
  let { email } = body

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: email cannot be blank'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Password cannot be blank'
    })
  }

  email = email.toLowerCase()

  User.find({ email: email }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: server error (1)'
      })
    }
    if (users.length !== 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid Email or Password'
      })
    }

    const user = users[0]
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid Password'
      })
    }
    // Correct User...
    const userSession = new UserSession()
    userSession.userId = user._id

    userSession.save((err, doc) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Error: Could not load user... Server error.'
        })
      }

      return res.send({
        success: true,
        message: 'Sign in successful.',
        token: doc._id
      })
    })
  })
}

// Verifying Token
export const verifyUser = async (req, res) => {
  // Get token
  const { query } = req
  const { token } = query
  console.log(token)

  // Verify token is one of a kind and not deleted
  UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
    if (err) {
      console.log(err)
      // Should occur if token string is not long enough
      return res.send({
        success: false,
        message: 'Error: server error. (1)'
      })
    }

    console.log(sessions.length)
    // .length of an object allowed???
    if (sessions.length !== 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid Token'
      })
    } else {
      return res.send({
        success: true,
        message: 'User Authenticated'
      })
    }
  })
}

export const logoutUser = async (req, res) => {
  // Get token
  const { query } = req
  const { token } = query
 //  console.log(token)

  // Verify token is one of a kind and not deleted
  UserSession.findOneAndUpdate({ _id: token, isDeleted: false }, { $set: { isDeleted: true } }, (err, sessions) => {
    if (err) {
      console.log(err)
      // Should occur if token string is not long enough
      return res.send({
        success: false,
        message: 'Error: server error. (1)'
      })
    }

    console.log(sessions)
    console.log(sessions.length)
    if (sessions !== null) {
      return res.send({
        success: true,
        message: 'User Logged Out'
      })
    } else {
      return res.send({
        success: false,
        message: 'Error: Server error. (2)'
      })
    }
  })
}

// Deleting a user
export const deleteUser = async (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove.then(() => res.json({ success: true })))
    .catch(error => res.status(404).json({ message: error.message }))
}
