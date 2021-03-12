import React from 'react'

class SignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      signUpError: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    fetch('http://localhost:5000/api/account/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            isLoading: false,
            signUpError: json.message,
            // Redirect or clear state after
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
          })
        }
        console.log('json', json)
        this.setState({
          logInError: json.message,
          isLoading: false
        })
      })
      .catch(err => console.error(err))
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  render () {
    return (
      <div className='signUpForm'>
        <p>{this.state.signUpError}</p>
        <form onSubmit={this.handleSubmit}>
          <div className='textForm'>
            <label>First Name:
              <input
                type='text'
                name='firstname'
                value={this.state.firstname}
                onChange={this.handleInputChange}
                placeholder='First Name'
              />
            </label>
            <br />
            <label>Last Name:
              <input
                type='text'
                name='lastname'
                value={this.state.lastname}
                onChange={this.handleInputChange}
                placeholder='Last Name'
              />
            </label>
            <br />
            <label>Email:
              <input
                type='email'
                name='email'
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder='Email'
              />
            </label>
            <br />
            <label>Username:
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder='Username'
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
      </div>
    )
  }
}

export default SignUpForm
