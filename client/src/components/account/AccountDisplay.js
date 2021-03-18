import React from 'react'
import { getFromStorage } from '../utils/storage.js'

class AccountDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      acctType: '',
      createdAt: ''
    }
  }

  componentDidMount () {
    const storage = getFromStorage('the_main_app')
    const { token } = storage
    console.log(token)
    if (storage && storage.token) {
      fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
        .then(res => res.json())
        .then(json => this.setState({
          username: json.username,
          email: json.email,
          acctType: json.acctType,
          createdAt: json.createdAt
        }))
        .catch((err) => console.log('Something went wrong...', err))
    }
  }

  render () {
    return (
      <div className='AccountDetails'>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <p>Account Type: {this.state.acctType}</p>
        <p>Created At: {this.state.createdAt}</p>
      </div>
    )
  }
}

export default AccountDisplay
