import React from 'react'
import { getFromStorage, setInStorage } from './utils/storage'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      logInError: '',
      token: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    // Make 'the_main_app' unique. Sets initial status for website.
    const storage = getFromStorage('the_main_app')
    if (storage && storage.token) {
      const { token } = storage
      // Verify
      // Seperate into other file for organization
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ token: token, isLoading: false })
          } else {
            // Server Error... Token is not valid
            this.setState({ isLoading: false })
          }
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    // Grab state
    // Post request to back-end
    fetch('http://localhost:5000/api/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log('json login', json)
        if (json.success) {
          setInStorage('the_main_app', { token: json.token })
          this.setState({
            logInError: json.message,
            isLoading: false,
            email: '',
            password: '',
            token: json.token
          })
        } else {
          this.setState({
            logInError: json.message,
            isLoading: false
          })
        }
      })
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  handleLogout () {
    this.setState({ isLoading: true })
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
      <div className='signInForm'>
        <p>{this.state.logInError}</p>
        <form onSubmit={this.handleSubmit}>
          <div className='loginForm'>
            <label>Email:
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder='Email'
              />
            </label>
            <br />

            <label>Password:
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder='Password'
              />
            </label>
            <br />
            <input
              type='submit'
              value='Submit'
            />
          </div>
        </form>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default LoginForm
