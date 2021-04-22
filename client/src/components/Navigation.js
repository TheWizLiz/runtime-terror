import React from "react";
import { Link, withRouter } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getFromStorage } from './utils/storage.js'

class Navigation extends React.Component {

  constructor (props) {
    super(props)
    this.state = {isLoggedIn: false, isAdmin: false}
    this.validateAdmin = this.validateAdmin.bind(this)
    this.loc = props.location.pathname;
    window.navbar = this;
  }

  componentDidMount () {
    const storage = getFromStorage('the_main_app')
    // console.log(token)
    if (storage && storage.token) {
      const { token } = storage
      fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
        .then(res => res.json())
        .then(player => this.validateAdmin(player))
        .catch((err) => console.log('An error Occured Loading the Player Data', err))
    }
  }

  shouldReload() {
    this.componentDidMount();
    this.validateAdmin();
  }

  validateAdmin (player) {
    if (player == null) {
      this.setState({
        isAdmin: false,
        isLoggedIn: false
      })
    } else if (player.acctType === 'player') {
      this.setState({
        isAdmin: false,
        isLoggedIn: true
      })
    } else {
      this.setState({
        isAdmin: true,
        isLoggedIn: true
      })
    }
  }

  render () {
      return (
        <div className="navigation">
          <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
            <div class="container">
              <Link class="navbar-brand" to="/">
                Gator Humans versus Zombies
              </Link>
        
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
              </button>
    
              <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto stick">
                  <li
                    class={`nav-item  ${
                      this.loc === "/" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/">
                      Home
                      <span class="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li
                    class={`nav-item  ${
                      this.loc === "/about" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/about">
                      About
                    </Link>
                  </li>
    
                  <li
                    class={`nav-item  ${
                      this.loc === "/Games" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/games">
                      Games
                    </Link>
                  </li>
    
                  
                  <NavDropdown title="Rules" id="basic-nav-dropdown">
                  <li class={`nav-item  ${this.loc === "/PvPRules" ? "active" : ""}`}>
                    <Link class="dropdown-item" to="/pvp-rules">PvP Rules</Link>
                    </li>
                    <li class={`nav-item  ${this.loc === "/CashHuntRules" ? "active" : ""}`}>
                    <Link class="dropdown-item" to="/cash-hunt-rules">Cash Hunt Rules</Link>
                    </li>
                    <li class={`nav-item  ${this.loc === "/ModGuide" ? "active" : ""}`}>
                    <Link class="dropdown-item" to="/mod-guide">Mod Guide</Link>
                    </li>
                    <NavDropdown.Divider />
                    <li class={`nav-item  ${this.loc === "/PlayerSafetyPlan" ? "active" : ""}`}>
                    <Link class="dropdown-item" to="/player-safety-plan">Player Safety Plan</Link>
                    </li>
                  </NavDropdown>
    
                  {/*<li
                    class={`nav-item  ${
                      this.loc === "/Updates" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/updates">
                      Updates
                    </Link>
                  </li>*/}
  
                  {this.state.isLoggedIn && !this.state.isAdmin &&
                  <li
                    class={`nav-item  ${
                      this.loc === "/ActionLog" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/action-log">
                      Log Kill
                    </Link>
                  </li>
                  }

                  {this.state.isLoggedIn &&
                  <li
                    class={`nav-item  ${
                      this.loc === "/AccountDetails" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/account-details">
                      Account Details
                    </Link>
                  </li>
                  }

                  <li
                    class={`nav-item  ${
                      this.loc === "/Leaderboard" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/leaderboard">
                      Leaderboard
                    </Link>
                  </li>
    
                  {!this.state.isAdmin &&
                  <li
                    class={`nav-item  ${
                      this.loc === "/contact" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/contact">
                      Contact
                    </Link>
                  </li>
                  }

                  {this.state.isAdmin && 
                      <li
                      class={`nav-item  ${
                        this.loc === "/AdminDashboard" ? "active" : ""
                      }`}
                    >
                      <Link class="nav-link" to="/admin-dashboard">
                        Admin Dashboard
                      </Link>
                    </li>
                  }
                  
                  {this.state.isLoggedIn && 
                  <li
                    class={`nav-item  ${
                      this.loc === "/LogIn" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/login">
                      Log Out
                    </Link>
                  </li>
                  }

                  {!this.state.isLoggedIn && 
                  <li
                    class={`nav-item  ${
                      this.loc === "/LogIn" ? "active" : ""
                    }`}
                  >
                    <Link class="nav-link" to="/login">
                      Log In
                    </Link>
                  </li>
                  }
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
  }

}

export default withRouter(Navigation);
