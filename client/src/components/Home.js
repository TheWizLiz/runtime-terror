import React from "react";
import Logo from '../images/logo.png';
import GameLogo from '../images/gameLogo.png';

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid mb-4 mb-lg-4"
              src={Logo}
              alt="GHvZ Logo"
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Architecture Obliteration</h1>
            <p>
            March 27th from 2-6pm on the Architecture Courtyard.
            </p>
            <img
              class="img-fluid mb-4 mb-lg-4"
              src={GameLogo}
              alt="Architecture Obliteration Logo"
            />
            <a class="btn btn-secondary" href="./registration/:oblit" role="button">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;