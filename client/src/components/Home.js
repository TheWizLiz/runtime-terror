import React from "react";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://i2.wp.com/gatorhvz.com/wp-content/uploads/2020/10/android-chrome-512x512-1.png?w=512&ssl=1"
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