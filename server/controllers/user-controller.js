// Add Route functions for routes/posts.js here to keep code clean.
// (req, res, next)
// HTTP Status Codes: https://www.restapitutorial.com/httpstatuscodes.html
import User from '../models/User.js'
import UserSession from '../models/UserSession.js'

// Retrieve all users from MongoDB
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
  const { firstname, lastname, username, password } = body
  let { email } = body

  if (!firstname) {
    return res.send({
      success: false,
      message: 'First name cannot be blank'
    })
  }

  if (!lastname) {
    return res.send({
      success: false,
      message: 'Last name cannot be blank'
    })
  }

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

  // Need to extend form verification to usernames as well.
  // Also need to learn about sanitizing inputs
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

    newUser.firstname = firstname
    newUser.lastname = lastname
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

    // console.log(sessions.length)
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

// Logging out users, uses token to affirm logout
export const logoutUser = async (req, res) => {
  // Get token
  const { query } = req
  const { token } = query
  //  console.log(token)

  // Verify token is one of a kind and not deleted

  // ISSUE: When attempting to logout with an invalid token, unhandled errors.
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
    // console.log(sessions.length)
    if (sessions) {
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

export const getAcct = async (req, res, next) => {
  try {

    // If the browswer returns a correct token in the localStorage
    // localStorage pasted in browser request
    // Make sure Usersession is logged in and that the correct token is returned
    // Connect UserSession to User
    const { query } = req
    const { acct } = query
    console.log('request', acct)
    UserSession.findOne({ _id: acct, isDeleted: false }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error (101)'
        })
      }

      if (!sessions) {
        return res.send({
          success: false,
          message: 'Error: User not found???'
        })
      } else {
        req.user = sessions
        next()
      }
    })
    
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  const { user } = req
  const { userId } = user

  if (user) {
    console.log('USERID', userId)
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Found session but not user. Strange...'
        })
      } else {
        res.send(JSON.stringify(user))
      }
    })
  } else {
    return res.send({
      success: false,
      message: 'user object not found'
    })
  }
 
}
