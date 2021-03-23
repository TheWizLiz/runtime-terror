import React from "react";
import RecoverForm from './RecoverForm';

class Recover extends React.Component {
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
                        <h1 class="font-weight-light">Reset Password</h1><br/>
                        <p>Please enter your email and new password to reset your account password.</p>
                        <RecoverForm />
                    </div>
                </div>  
            </div>
        </div>
        )
      }
      return (
        <div>
          <p>Password Reset Successfully</p>
        </div>
      )
    }
  }
  
  export default Recover