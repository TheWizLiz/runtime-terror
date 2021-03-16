import React from "react";
import Login from './Login/Login.js'

function LogIn() {
  return (
    <div className="login">
        <div class="container">
            <div class="row align-items-center my-5">
                <h1 class="font-weight-light">Log In</h1>
            </div>
            <Login />
        </div>
    </div>
  );
}

export default LogIn;