import React from "react";
import Logo from '../images/logo.png';
import GameLogo from '../images/gameLogo.png'
import HomeGame from '../components/HomeGame.js'

function Home () {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <img
              class="img-fluid mb-4 mb-lg-4"
              src={Logo}
              alt="GHvZ Logo"
            />
          </div>
          <div class="col-lg-5">
            <br /> <br />
            <h1 class="font-weight-light">Upcoming Game</h1>
            <HomeGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
