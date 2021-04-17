import React from 'react';

class RecoverForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      resetPassError: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.props.user)
    fetch('http://localhost:5000/api/account/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: this.props.user,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            isLoading: false,
            resetPassError: json.message,
            // Redirect or clear state after
            password: ''
          })
          this.props.handler()
        }
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
      <div className='RecoverForm'>
        <p>{this.state.forgotPassError}</p>
        <form onSubmit={this.handleSubmit}>
          <div className='textForm'>
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

export default RecoverForm
