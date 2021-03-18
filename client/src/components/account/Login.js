import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      isLoading: true
    }
  }

  render () {
    if (!this.state.token) {
      return (
        <div>
          <p>Sign Up</p>
          <SignUpForm isLoading={this.state.isLoading}/>
          <p>Sign In</p>
          <LoginForm isLoading={this.state.isLoading}/>
        </div>
      )
    } else {
      return (
        <div>
          <p>Account (Verified)</p>
        </div>
      )
    }
    // Should re-direct to Home Screen or Account Details when returned Login token
    // TODO: Add Logout Button.
  }
}

export default Home
