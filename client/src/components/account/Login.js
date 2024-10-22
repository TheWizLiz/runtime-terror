import React from 'react'
import { getFromStorage } from '../utils/storage'
import { Link } from "react-router-dom";
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      isLoading: false
    }
    this.loggedHandler = this.loggedHandler.bind(this)
  }

  loggedHandler () {
    this.setState({
      isLoading: true
    })
  }

  componentDidMount () {
    // Check if there is a token with a user session already
    // If true, then replace NavBar 'Login' with 'Logout'
    // Also, add AccountDetails to pop up on the navbar
    // Replace screen with show account details (verified and logout button)

    // If user has logged in before, 'the_main_app' will have a token
    // Otherwise, there will be nothing and it will return null.
    console.log('MOUNT')
    const storage = getFromStorage('the_main_app')
    if (storage && storage.token) {
      // If app already has a token, then user is already logged in.
      const { token } = storage
      this.setState({ token: token, isLoading: false })
    }
  }

  // Situations:
  // 1. User Logs in for the first time
  // a. isLoggedIn False, No Token => Token and LoggedIn
  // 2. User is already logged in
  // b. Token is there, no isLogged => token: token, isLogged: true; updates
  // 3. User is not logged in already
  // c. token is false, isLogged is false
  componentDidUpdate () {
    // If user logs in, isLoggedIn is true, token is true
    console.log('UPDATE')
    const storage = getFromStorage('the_main_app')
    if (storage && storage.token && this.state.isLoading) {
      const { token } = storage
      this.setState({ token: token, isLoading: false })
      window.navbar.shouldReload()
    } else if (!storage && this.state.token && this.state.isLoading) {
      // Occur when logoutButton
      this.setState({ token: '', isLoading: false })
      window.navbar.shouldReload()
    }
  }

  render () {
    if (!this.state.token) {
      return (
        <div class="container">
          <div class="row align-items-center">
          <h1 class="font-weight-light">Log In</h1>
          </div>
          <div class="row">
          <p>Gator Humans vs Zombies</p>
          </div>
          <div class="row">
          <LoginForm handler={this.loggedHandler} />
          </div>
          <div class="row mt-3">
          <p>
            Don't have an account?
            <Link to='/signup'> Sign Up</Link> <br />
          </p>
          </div>
          <div class="row">
          <Link to='/forgot'>Forgot Password?</Link>
        </div>
        </div>
      )
    } else {
      return (
        <div class="container">
        <div class="row align-items-center">
          <h1 class="font-weight-light">Log Out</h1>
          </div>
          <div class="row">
          <p>Account (Verified)</p>
          </div>
          <div class="row">
          <Link to='/account-details'>Account Details</Link>
          </div>
          <div class="row mt-3">
          <LogoutButton handler={this.loggedHandler} />
        </div>
        </div>
      )
    }
    // Should re-direct to Home Screen or Account Details when returned Login token
    // TODO: Add Logout Button.
  }
}

export default Login
