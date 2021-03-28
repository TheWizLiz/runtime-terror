import React from "react";
import ForgotForm from './ForgotForm';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Forgot extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      isLoading: true,
      sent: false
    }
    this.forgotHandler = this.forgotHandler.bind(this)
  }

  forgotHandler () {
    this.setState({
      sent: true
    })
  }

  componentDidUpdate () {
    console.log('Email Sent!')
  }

  render () {
    if (!this.state.sent) {
      return (
        <div className="forgot">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col">
                <h1 class="font-weight-light">Forgot Password</h1><br />
                <p>Enter your email address to recieve a password recovery email.</p>
                <ForgotForm handler={this.forgotHandler} /> <br />
                <Link to='/signup'>Create New Account</Link> <br />
                <Link to='/signup'>Back To Login</Link>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='forgot'>
          <div class='container'>
            <div class="row align-items-center my-5">
              <div class="col">
                <p>Email Sent Successfully</p>
                <Link to='/signup'>Back To Login</Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Forgot

