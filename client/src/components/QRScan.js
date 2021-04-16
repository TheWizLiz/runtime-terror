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
          scanned: false
      }
      this.handleScan=this.handleScan.bind(this)
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
    if(this.state.playerLoaded == false){
      const storage = getFromStorage('the_main_app')
      // console.log(token)
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

  componentDidUpdate () {
    if (this.state.scanned==true) {
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
                  //username: '',
                  scanned: false
                })
              }
            })
            .catch(err => console.error(err))
      
            fetch("http://localhost:5000/api/games/addDeaths", {
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
                  //username: '',
                  prevResult: this.state.result,
                  scanned: false
                })
              }
            })
            .catch(err => console.error(err)) 
      }
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