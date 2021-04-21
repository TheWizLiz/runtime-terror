// Add Route functions for routes/posts.js here to keep code clean.
// (req, res, next)
// HTTP Status Codes: https://www.restapitutorial.com/httpstatuscodes.html
import User from '../models/User.js'
import UserSession from '../models/UserSession.js'
import RegistrationDetails from '../models/RegistrationDetails.js'

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
  const { firstname, lastname, username, password, phone_no } = body
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

  if (!phone_no) {
    return res.send({
      success: false,
      message: 'Error: phone number cannot be blank'
    })
  }

  email = email.toLowerCase()

  // Need to extend form verification to usernames as well.
  // Also need to learn about sanitizing inputs
  User.find({ $or: [{ email: email }, { username: username }, { phone_no: phone_no }] }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: server error. (1e)'
      })
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'An account with this email address/username/phone number already exists.'
      })
    }

    const newUser = new User()

    newUser.firstname = firstname
    newUser.lastname = lastname
    newUser.email = email
    newUser.username = username
    newUser.phone_no = phone_no
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

// Retrieve all registered players in a game from MongoDB
export const getRegisteredPlayers = async (req, res) => {
  console.log("HERE")
  try {
    // Find all users
    const RegDetails = await RegistrationDetails.find()
    console.log(RegDetails)
    res.status(200).json(RegDetails)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


// Deleting a user
export const deleteUser = async (req, res) => {
  const { body } = req
  const { username } = body

  User.findOneAndRemove({username: username}, (err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error deleting user. Please Try Again.'
      })
    } else if (!user) {
      return res.send({
        success: false,
        message: 'User to delete was not found.'
      })
    } else {
      console.log("Removed User : ", user);
    }
  })
}

// updating a player's account
export const updatePlayerAcc = async (req, res) => {
  const { body } = req
  const { username } = body

  User.findOneAndUpdate({ username: username, acctType: 'player' }, { $set: { acctType: 'admin' } }, (err, type)  => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error updating user. Please Try Again.'
      })
    } else if (!type) {
      return res.send({
        success: false,
        message: 'Account type was not found'
      })
    } else {
      //console.log("(updatePlayerAcc: Changed type to ", type);
    }
  })
} 

// updating a admin's account
export const updateAdminAcc = async (req, res) => {
  const { body } = req
  const { username } = body

  User.findOneAndUpdate({ username: username, acctType: 'admin' }, { $set: { acctType: 'player' } }, (err, type)  => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error updating user. Please Try Again.'
      })
    } else if (!type) {
      return res.send({
        success: false,
        message: 'Account type was not found'
      })
    } else {
      //console.log("(updateAdminAcc: Changed type to ", type);
    }
  })
} 

export const getAcct = async (req, res, next) => {
  try {
    // If the browswer returns a correct token in the localStorage
    // localStorage pasted in browser request
    // Make sure Usersession is logged in and that the correct token is returned
    // Connect UserSession to User
    const { query } = req
    const { acct } = query
    // console.log('request', acct)
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

export const registerUser = async (req, res) => {
  // Get all inputs
  const { body } = req
  const { userID, gameID, notify, horde} = body

  // Checking form values
  if (!userID) {
    return res.send({
      success: false,
      message: 'Error: No userID in request.'
    })
  } else if (!gameID) {
    return res.send({
      success: false,
      message: 'Error: No gameID specified.'
    })
  }

  // Creating registration object to insert
  const newRegistration = new RegistrationDetails()

    newRegistration.game_id = gameID
    newRegistration.player_id = userID
    newRegistration.notifications = notify
    newRegistration.originalHorde = horde

  // Adding registration to database
  newRegistration.save((err, user) => {
    if (err) {
      console.log('An error registering for the game occurred: ', err)
      return res.send({
        success: false,
        message: 'Error: Registration not completed properly.'
      })
    }
    return res.send({
      success: true,
      message: 'Registered Successfully.'
    })
  })
}