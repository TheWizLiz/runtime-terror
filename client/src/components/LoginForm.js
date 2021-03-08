import React from 'react'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  render () {
    return (
      <div className='signUpForm'>
        <form onSubmit={this.handleSubmit}>
          <div className='loginForm'>
            <label>Username:
              <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} placeholder='Username' />
            </label><br></br>

            <label>Password:
              <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder='Password' />
            </label>

            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
