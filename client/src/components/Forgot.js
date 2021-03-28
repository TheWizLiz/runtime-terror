import React from "react";
import ForgotForm from './ForgotForm';

class Forgot extends React.Component {
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
        <div className="forgot">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col">
                <h1 class="font-weight-light">Forgot Password</h1><br/>
                <p>Enter your email address to recieve a password recovery email.</p>
                <ForgotForm />
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <p>Email Sent Successfully</p>
      </div>
    )
  }
}

export default Forgot

