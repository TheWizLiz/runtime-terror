import React from 'react';

class ForgotForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    fetch('http://localhost:5000/api/account/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            isLoading: false,
            sendEmailError: json.message,
            // Redirect or clear state after
            email: ''
          })
        }
        /*console.log('json', json)
        this.setState({
          logInError: json.message,
          isLoading: false
        }) */
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
      <div className='ForgotForm'>
        <p>{this.state.sendEmailError}</p>
        <form onSubmit={this.handleSubmit}>
          <div className='textForm'>
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

export default ForgotForm
