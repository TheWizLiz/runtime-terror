import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Gator Humans versus Zombies
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Games" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/games">
                  Games
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Rules" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/rules">
                  Rules
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Updates" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/updates">
                  Updates
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Leaderboard" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/LogIn" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/login">
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);