import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import Button from "react-bootstrap/Button";
import { getFromStorage } from './utils/storage.js';

class QRScan extends Component {
  constructor(props){
      super(props)
      this.state = {
          result: "Aim Camera at QR Code",
          prevResult: "",
          showComponent: false,
          username: '',
          loggingError: '',
          playerLoaded: false,
          kills: 0,
          game: 1,
          isLoading: true,
          scanned: false,
          lives: -1,
          currentTeam: ""
      }
      this.handleScan=this.handleScan.bind(this)
      this.getPlayerStats = this.getPlayerStats.bind(this)
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        scanned: true
      })
    }
  }
  
  handleError = err => {
    console.error(err)
  }

  componentDidMount () {
    if (this.state.playerLoaded == false){
      const storage = getFromStorage('the_main_app')
      if (storage && storage.token) {
        const { token } = storage
        fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/account/getAcct/?acct=' + token)
          .then(res => res.json())
          .then(player => this.setState({
            username: player.username
          }))
          .catch((err) => console.log('An error Occured Loading the Player Data', err))
      }
    }
  }

  getPlayerStats () {
    fetch("http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/games/currentPlayerStats/?username=" + this.state.username)
    .then(res => res.json())
    .then(results => {
      if (results.success) {
        const player = results.result[0]
        console.log('Player', player)
        this.setState({
          lives: player.remaining_lives,
          currentTeam: player.current_team,
          playerLoaded: true
        })
      } else {
        console.log('Error success was false:', results)
      }
    })
  .catch(err => console.log('Problem Loading stats', err))
  }

  componentDidUpdate () {
    // After setState in mount, do this. makes sure that this.state.username is loaded.
    if (!this.state.playerLoaded && this.state.username) {
      console.log('LOADING PLAYER')
     this.getPlayerStats()
    }

    if (this.state.scanned==true) {
      if (this.state.playerLoaded) {
            fetch("http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/games/updateStats", {
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
      
            fetch("http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/games/addDeaths", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: this.state.result
              })
            })
            .then(res => res.json())
            .then(json => {
              if(json.success){
                this.setState({
                  isLoading: false,
                  prevResult: this.state.result,
                  scanned: false,
                  //lives: this.state.lives - 1
                })
              }
            })
            .catch(err => console.error(err))
      }
    }

    if(this.state.playerLoaded && this.state.lives == 0){
      fetch("http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/games/changeTeam", {
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
  }

  render() {
    const { showComponent } = this.state;
    if(this.state.result == "Aim Camera at QR Code"){
      return (
          <React.Fragment>
              <div>
              <Button onClick={() => this.setState({showComponent:!showComponent})}>Click to use QR Code Scanner</Button>
              {this.state.showComponent ? 
                <QrReader 
                delay={150}
                onError={this.handleError}
                onScan={this.handleScan}
                facingMode={'environment'}
                style={{ width: 500, height: 500}}
                /> :
                null
              }
              
              {this.state.showComponent ?
                <p class="font-weight-light">{this.state.result}</p> :
                null
              }

              </div>
          </React.Fragment>
          
      )
    } else {
      return(
        <div>
          <Button onClick={() => this.setState({result:"Aim Camera at QR Code"})}>Click to Scan Another Code</Button>
          <p class="font-weight-light">You have killed {this.state.result}</p>
        </div>
      )
    }
  }
}

export default QRScan;