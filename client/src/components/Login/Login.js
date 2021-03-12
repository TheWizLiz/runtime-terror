import React from 'react'
import LoginForm from '../LoginForm'
import SignUpForm from '../SignUpForm'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
    if (this.state.isLoading) {
      return (<div><p>Loading...</p></div>)
    }

    if (!this.state.token) {
      return (
        <div>
          <p>Sign Up</p>
          <SignUpForm />
          <p>Sign In</p>
          <LoginForm />
        </div>
      )
    }
    // Should re-direct to Home Screen or Account Details
    return (
      <div>
        <p>Account (Verified)</p>
      </div>
    )
  }
}

export default Home
