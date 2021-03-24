import React from "react";
import { useParams } from 'react-router-dom';
import RecoverForm from './RecoverForm';

function Recover() {
  const { user } = useParams()
  console.log(user)

    return (
    <div className="forgot">
        <div class="container">
            <div class="row align-items-center my-5">
                <div class="col">
                    <h1 class="font-weight-light">Reset Password</h1><br/>
                    <p>Please enter a new password.</p>
                    <RecoverForm user={user}/>
                </div>
            </div>  
        </div>
    </div>
    )
}

export default Recover
