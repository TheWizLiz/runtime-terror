import React from "react";
import { useParams } from 'react-router-dom';
import RecoverForm from './RecoverForm';
import { Link } from "react-router-dom";

function Recover () {
  const { user } = useParams()
  const [recovered, recoverHandler] = React.useState(false)
  console.log(user)

  if (!recovered) {
    return (
      <div className="forgot">
        <div class="container">
          <div class="row align-items-center">
            <div class="col">
              <h1 class="font-weight-light">Reset Password</h1><br />
              <p>Please enter a new password.</p>
              <RecoverForm user={user} handler={() => recoverHandler(true)} />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="forgot">
        <div class="container">
          <div class="row align-items-center my-5">
            <div class="col">
              <p>Password Reset Successfully</p>
              <Link to='/login'>Log In</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Recover
