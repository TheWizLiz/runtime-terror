import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import QRScan from "./QRScan";
import PlayerQRCode from "./PlayerQRCode";
import { getFromStorage } from './utils/storage.js';

class ActionLog extends Component{
    constructor(props){
        super(props)
        this.state = {
            playerid: "",
            playerLoaded: "",
            username: "",
            activeGame: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange (e) {
        const target = e.target
        const name = target.name
    
        this.setState({ [name]: target.value })
      }

    handleSubmit (e) {
        e.preventDefault()
        if (this.state.playerLoaded) {
            fetch("http://localhost:5000/api/games/updateStats", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: this.state.username
              })
            })
            .then(res => res.json())
            .then(json => {
              if(json.success){
                this.setState({
                  isLoading: false,
                  scanned: false
                })
              }
            })
            .catch(err => console.error(err))
        }

        fetch("http://localhost:5000/api/games/addDeaths", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.playerid
            })
            })
            .then(res => res.json())
            .then(json => {
            if(json.success){
                this.setState({
                playerid: "",
                })
            }
            })
            .catch(err => console.error(err))
    }

    componentDidMount () {
      fetch('http://localhost:5000/api/games/checkGameStatus')
      .then(res => res.json())
      .then(status => {
        if (status.success) {
          this.setState({
            activeGame: true
          })
        } else {}
      })
      .catch(err => console.log('Problem Loading Game Status', err))

        if(this.state.playerLoaded == false){
          const storage = getFromStorage('the_main_app')
          if (storage && storage.token) {
            const { token } = storage
            fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
              .then(res => res.json())
              .then(player => this.setState({
                username: player.username,
                playerLoaded: true,
              }))
              .catch((err) => console.log('An error Occured Loading the Player Data', err))
          }
        }
      }

    render(){
      if(this.state.activeGame){
        return(
            <div classname="ActionLog">
                <div class="container">
                    
                    <h1 class="font-weight-light">Action Log</h1>

                    <PlayerQRCode />

                    <br/>

                    <h1 class="font-weight-light">Log Kill</h1>

                    <Form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
                        <Form.Control name="playerid" placeholder="User of ID of Killed Player" value={this.state.playerid} />
                        <Button variant="primary" type="submit">Log Kill</Button>{' '}
                    </Form>

                    <br/>

                    <h1 class="font-weight-light">Scan QR Code</h1>

                    <QRScan />

                    <br/>

                    <Button variant="primary" href="tel:352-474-8358">Contact an Administrator</Button>{' '}

                </div>
            </div>
        );
      } else {
        return(
          <div class ="container">
            <h1 class="font-weight-light">Action Log</h1>
            
            <br />
            
            <p>There is not currently a game in progress</p>
          </div>
        );
      }
    }
}

export default ActionLog;