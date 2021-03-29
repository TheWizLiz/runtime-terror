import React from "react";
import AccManager from './admin/AccManager.js'
import { getFromStorage } from './utils/storage.js'

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
            <h4>Manage Accounts:</h4>
            <AccManager />
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
