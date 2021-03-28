import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUpForm from '../components/account/SignUpForm.js'

function SignUp() {
  return (
    <div className="signUp">
      <div class="container">
        <div class="row align-items-center my-5">
          <h1 class="font-weight-light">Sign Up</h1>
        </div>
        <SignUpForm />
        <div class="row align-items-center my-5">
          <p>Have an account?</p>
          <Link to='/login'>Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp