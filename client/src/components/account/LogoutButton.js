import React from 'react'
import { getFromStorage, removeFromStorage } from '../utils/storage.js'

class LogoutButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  // Add removing item from storage so the token is no longer saved
  // Only set visible when user is logged in
  handleLogout () {
    this.setState({ visible: true })
    // Make 'the_main_app' unique. Sets initial status for website.
    const storage = getFromStorage('the_main_app')
    if (storage && storage.token) {
      const { token } = storage
      console.log(token)
      // Seperate into other file for organization
      fetch('http://localhost:5000/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log('logout json', json)
          if (json.success) {
            this.setState({ token: '', isLoading: false })
            removeFromStorage('the_main_app')
          } else {
            // Server Error... Token is not valid
            this.setState({ isLoading: false })
          }
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  render () {
    return (
      <button onClick={this.handleLogout}>Logout</button>
    )
  }
}

export default LogoutButton
