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
        </div>
      </div>
    </div>
  );
}

export default Home;