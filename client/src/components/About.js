
import React from "react";
import Gabe_Pic from '../images/gabe_t_pic.jpg';
import Ethan_Pic from '../images/ethan_s_pic.jpg';
import Alejandro_Pic from '../images/alejandro_k_pic.jpg';
import Ava_Pic from '../images/ava_m_pic.jpg';
import Zoe_Pic from '../images/zoe_n_pic.jpg';

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <h1 class="font-weight-light">About</h1>
            <p>
            Gators Humans vs. Zombies is an outdoor, on-campus game in-which players team up to defeat enemies and complete objectives.
            It is similar to a nerf war; Players complete objectives and take out enemy forces with their blasters while enemies try their
            best to hinder the players. With an immersive storyline that continues throughout each strike this semester, players will be
             faced with harrowing challenges and diverse characters who could be friend or foe. This game is a great way to spend time with 
             your friends, make new ones, relieve stress, exercise, and most importantly, have fun! Will you complete the mission? Will your 
             group make it on to the leaderboard? Only time will tell.
            </p>
            <h2 class="font-weight-light">E-Board and SOD</h2>
              <div class="row align-items-center my-5">
               <div class="col-lg-3">
                  <img
                    class="img-fluid mb-4 mb-lg-4"
                    src={Gabe_Pic}
                    alt="Gabe_pic"
                  />
                </div>
                <div class="col-lg-3">
                  <h4>Gabriel Turmail</h4>
                  <p>President</p>
                </div>
                <div class="col-lg-3">
                  <img
                    class="img-fluid mb-4 mb-lg-4"
                    src={Alejandro_Pic}
                    alt="Alejandro_pic"
                  />
                </div>
                <div class="col-lg-3">
                  <h4>Alejandro Kirsch</h4>
                  <p>Vice President</p>
                </div>
                <div class="col-lg-3">
                  <img
                    class="img-fluid mb-4 mb-lg-4"
                    src={Ethan_Pic}
                    alt="Ethan_pic"
                />
                </div>
                <div class="col-lg-3">
                  <h4>Ethan Shover</h4>
                  <p>Treasurer</p>
                </div>
                <div class="col-lg-3">
                  <img
                    class="img-fluid mb-4 mb-lg-4"
                    src={Ava_Pic}
                    alt="Ava_pic"
                  />
                </div>
                <div class="col-lg-3">
                  <h4>Ava McGowan</h4>
                  <p>Special Projects Manager</p>
                </div>
                <div class="col-lg-3">
                  <img
                    class="img-fluid mb-4 mb-lg-4"
                    src={Zoe_Pic}
                    alt="Zoe_pic"
                  />
                </div>
                <div class="col-lg-3">
                  <h4>Zoe Nevins</h4>
                  <p>Social Outreach Director</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;