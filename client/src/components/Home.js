import React from "react";
import Logo from '../images/logo.png';

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={Logo}
              alt="GHvZ Logo"
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Gator Humans versus Zombies</h1>
            <p>
            University of Florida’s game of nerf battles with a twist; filled with objectives, stories, challenges, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;