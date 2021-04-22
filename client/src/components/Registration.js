import React from "react";
//import { FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { withRouter, Link } from "react-router-dom";
import { getFromStorage } from './utils/storage.js'
import Login from './account/Login.js'
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
            isLoggedIn: false,

            //Registration Information
            userID: '',
            gameID: this.props.match.params.id,
            //gameID: 'test',
            gameName: '',
            horde: false,
            notify: false,            
        }

        console.log(this.state.gameID);

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount () {
      const storage = getFromStorage('the_main_app')
      // console.log(token)
      if (storage && storage.token) {
        const { token } = storage
        await fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/account/getAcct/?acct=' + token)
          .then(res => res.json())
          .then(player => this.setState({
            userID: player.username,
            isLoggedIn: true
          }))
          .catch((err) => console.log('An error Occured Loading the Player Data', err))
      }

      fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/game/findGameInfo/?game_id=' + this.state.gameID) 
        .then(res => res.json())
          .then(requestedGame => this.setState({
            gameName: requestedGame.game_title
          }))
          .catch((err) => console.log('An error Occured Loading the Game Name', err))
    }

    handleInputChange (e) {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name
    
        this.setState({ [name]: value })

        console.log( {[name]: value });
      }

    handleSubmit (e) {
        e.preventDefault()
        // Call fetch function.
        fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/account/registerUser', {
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
      }

    render () {
      if (!this.state.isLoggedIn) {
        return (
          <div className='register'>
          <div class='container'>
            <div class='row align-items-center'>
              <h1 class='font-weight-light'>Register for Game:</h1>
            </div>
            <div class='row align-items-center'>
              <p>You must be logged in to register for a game</p>
              </div>
            <div class='row align-items-center'>
              <Link to='/signup'> Sign Up Here</Link> <br />
            </div>
          </div>
        </div>
        )
      } else if (this.state.loading) {
          return (
                <div classname="Registration">
                    <div class="container">
                        <div class="row align-items-center mb-3">
                        <h1 class="font-weight-light">Register for Game: {this.state.gameName}</h1>
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
                    <div class="row align-items-center">
                      <div class="col">
                        <p>You have successfully registered for this game.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
        }
    }
}

export default withRouter(Registration);