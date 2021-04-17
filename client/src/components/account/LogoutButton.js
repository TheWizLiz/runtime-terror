import React from 'react'
import { getFromStorage, removeFromStorage } from '../utils/storage.js'

class LogoutButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  // Add removing item from storage so the token is no longer saved
  // Only set visible when user is logged in
  handleLogout () {
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
            this.setState({ token: '' })
            removeFromStorage('the_main_app')
            this.props.handler()
          } else {
            // Server Error... Token is not valid
          }
        })
    } else {
      // Storage Token is not defined... Therefore cannot even log out
      this.setState({ visible: false })
    }
  }

  render () {
    if (this.state.visible) {
      return (
        <button class='btn btn-danger' onClick={this.handleLogout}>Logout</button>
      )
    } else {
      return (
        <p>Invisible Button</p>
      )
    }
  }
}

export default LogoutButton
