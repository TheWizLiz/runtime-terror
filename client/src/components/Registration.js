import React from "react";
//import { FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import { getFromStorage } from './utils/storage.js'
//import queryString from 'query-string';
//import ToggleButton from "react-bootstrap/ToggleButton";
//import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
//import Button from "react-bootstrap/Button";

class Registration extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            // Loading for state
            loading: true,
            message: '',
            msgType: '',

            //Registration Information
            userID: '',
            gameID: this.props.match.params.id,
            //gameID: 'test',
            horde: false,
            notify: false,            
        }

        console.log(this.state.gameID);

        const storage = getFromStorage('the_main_app')
        if (storage && storage.token) {
        const { token } = storage
        fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
        .then(res => res.json())
        .then(player => this.setState({
          userID: player.username,
        }))
        .catch((err) => console.log('An error Occured Loading the Player Data', err))
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange (e) {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name
    
        this.setState({ [name]: value })
      }

    handleSubmit (e) {
        console.log(this.state.gameID)
        e.preventDefault()
        // Call fetch function.
        fetch('http://localhost:5000/api/account/registerUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userID: this.state.userID,
            gameID: this.state.gameID,
            horde: this.state.horde,
            notify: this.state.notify
          })
        })
        .then(res => res.json())
            .then(json => {
        this.setState({
          loading: false,
         })
        })
      .catch(err => console.log(err))
      console.log("fetched")
    }

    render () {
        if (this.state.loading) {
          return (
                <div classname="Registration">
                    <div class="container">
                        <div class="row align-items-center mt-5 mb-3">
                        <h1 class="font-weight-light">Register for Game</h1>

                        </div>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group onChange={this.handleInputChange}>
                        <label>Do you want to be considered for the original horde?<br />
                        <input
                            type='checkbox'
                            name='horde'
                            value={this.state.horde}
                            onChange={this.handleInputChange}
                        />
                        </label>
                        <br />
                        <label>Do you want to recieve text and email notifications? <br />
                        <input
                            type='checkbox'
                            name='notify'
                            value={this.state.notify}
                            onChange={this.handleInputChange}
                        />
                        </label>
                        <br />
                        <input
                        type='submit'
                        class='btn btn-primary'
                        value='Submit'
                        />
                    </Form.Group>
                    </Form>
                </div>
                </div>
            )
        } else {
            return (
                <div className='Registration'>
                  <div class='container'>
                    <div class="row align-items-center my-5">
                      <div class="col">
                        <p>Registered Successfully</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
        }
    }
}

export default withRouter(Registration);