import React from 'react'
import { getFromStorage } from '../utils/storage'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import LogoutButton from './LogoutButton'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      isLoggedIn: false
    }
    this.loggedHandler = this.loggedHandler.bind(this)
  }

  loggedHandler () {
    this.setState({
      isLoggedIn: true
    })
  }

  componentDidMount () {
    // Check if there is a token with a user session already
    // If true, then replace NavBar 'Login' with 'Logout'
    // Also, add AccountDetails to pop up on the navbar
    // Replace screen with show account details (verified and logout button)

    // If user has logged in before, 'the_main_app' will have a token
    // Otherwise, there will be nothing and it will return null.
    const storage = getFromStorage('the_main_app')
    if (storage && storage.token) {
      const { token } = storage
      this.setState({ token: token, isLoggedIn: true })
    }
  }

  /*
  componentDidUpdate () {
    const storage = getFromStorage('the_main_app')
    if (storage && storage.token && !this.state.isLoggedIn) {
      const { token } = storage
      this.setState({ token: token })
    }
  }
  */

  render () {
    if (!this.state.token) {
      return (
        <div>
          <p>Sign Up</p>
          <SignUpForm />
          <p>Sign In</p>
          <LoginForm handler={this.loggedHandler} />
        </div>
      )
    } else {
      return (
        <div>
          <p>Account (Verified)</p>
          <LogoutButton />
        </div>
      )
    }
    // Should re-direct to Home Screen or Account Details when returned Login token
    // TODO: Add Logout Button.
  }
}

export default Login
