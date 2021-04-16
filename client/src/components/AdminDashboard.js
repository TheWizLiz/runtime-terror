import React from "react";
import AccManager from './admin/AccManager.js'
import UpdateGameManager from './admin/UpdateGameManager.js'
import { getFromStorage } from './utils/storage.js'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

class AdminDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      acctType: '',
      isAdmin: false,
      adminLoaded: false
    }
    this.validateAdmin = this.validateAdmin.bind(this)
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

  validateAdmin (player) {
    if (player.acctType === 'admin') {
      this.setState({
        username: player.username,
        email: player.email,
        acctType: player.acctType,
        createdAt: player.createdAt,
        adminLoaded: true,
        isAdmin: true
      })
    } else {
      this.setState({
        isAdmin: false,
        adminLoaded: true
      })
    }
  }

  render () {
    if (this.state.isAdmin && this.state.adminLoaded) {
      return (
        <div className='adminDashboard'>
          <div class='container'>
            <div class='row align-items-center my-5'>
              <h1 class='font-weight-light'>Admin Dashboard</h1>
            </div>
            <div class = "row">
              <div class = "col">
                <div class = "row">
                  <h4>Create a New Game:</h4>
                </div>
                  <div class = "row">
                <Button variant="primary" type="submit" href="http://localhost:3000/game-creation">
                  Create
                </Button>
                </div>
                <br/>
                <div class = "row">
                  <h4>Manage Accounts:</h4>
                  <AccManager />
                </div>
              </div>
              <div class = "col">
              <h4>Current Game:</h4>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Game to Display
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Current Game Title</Dropdown.Item>
                    <Dropdown.Item>Next Game Title</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br/>
                <UpdateGameManager />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='adminDashboard'>
          <div class='container'>
            <div class='row align-items-center my-5'>
              <h1 class='font-weight-light'>Not an admin. Restricted.</h1>
            </div>
          </div>
        </div>
      )
    }
    
  }
}

export default AdminDashboard
