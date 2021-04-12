import React, { Component } from "react";
import { getFromStorage } from './utils/storage.js';

class UpdateKills extends Component {
    constructor (props) {
      super(props)
      this.state = {
      // Additional Attributes: average time alive, wins, total_games, bounties
        username: '',
        loggingError: '',
        playerLoaded: false,
        kills: 0,
        game: 1
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

      componentDidUpdate () {
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
                username: ''
              })
            }
          })
          .catch(err => console.error(err))
      }
    }
      render(){
        return(
            <div>
                {this.state.username != " " ? (
                    "Done"
                ) : (
                    null
                )}
            </div>
        );
    }
}

export default UpdateKills;