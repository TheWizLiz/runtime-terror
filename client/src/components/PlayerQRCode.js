import React, { Component } from "react";
import { getFromStorage } from './utils/storage.js'
var QRCode = require('qrcode.react');

class PlayerQRCode extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: " ",
            playerLoaded: false

        }

    }

    componentDidMount () {
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

    render(){
        return(
            <div>
                {this.state.username != " " ? (
                    <QRCode style={{height:250, width:250}} value={this.state.username} />
                ) : (
                    null
                )}
            </div>
        );
    }

}

export default PlayerQRCode;