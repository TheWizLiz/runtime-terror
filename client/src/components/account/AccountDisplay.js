import React from 'react'
import GameResults from '../../components/games/GameResults.js'
import { getFromStorage } from '../utils/storage.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class AccountDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    // Additional Attributes: average time alive, wins, total_games, bounties
      username: '',
      email: '',
      acctType: '',
      createdAt: '',
      playerLoaded: false,
      gamesLoaded: false,
      kills: 0,
      deaths: 0,
      games: []
    }
  }

  // Working example. Not going to be final product.
  // Should be fetching account first, then using the username result to fetch for the game statistics
  // Only one example in database right now since game registration system is not created.
  // username: example, game_id: 1
  // game is an array since it returns all of the matches of username and game_id
  componentDidMount () {
    const storage = getFromStorage('the_main_app')
    // console.log(token)
    if (storage && storage.token) {
      const { token } = storage
      fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
        .then(res => res.json())
        .then(player => this.setState({
          username: player.username,
          email: player.email,
          acctType: player.acctType,
          createdAt: player.createdAt,
          playerLoaded: true
        }))
        .catch((err) => console.log('An error Occured Loading the Player Data', err))
    }
  }

  // Currently only grabs first game since this.state.game = 1.
  componentDidUpdate () {
    if (this.state.playerLoaded) {
      fetch('http://localhost:5000/api/games/getStats/?user=' + this.state.username)
        .then(res => res.json())
        .then(game => {
          console.log(game)
          let totalKills = 0
          let totalDeaths = 0

          for (let i = 0; i < game.length; i++) {
            totalKills += game[i].kills
            totalDeaths += game[i].deaths
          }

          this.setState({
            kills: totalKills,
            deaths: totalDeaths,
            playerLoaded: false,
            games: game,
            gamesLoaded: true
          })
        })
        .catch((err) => console.log('An error Occured Loading the Game Data', err))
    }
  }

  render () {
    if (this.state.username && this.state.gamesLoaded) {
      return (
        <div className='AccountDetails'>
          <div class='container'>
            <div class='row'>
              <div class='col-6'>
                <h4>Account Information:</h4>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
                <p>Account Type: {this.state.acctType}</p>
                <p>Created At: {this.state.createdAt}</p> <br />
                <Link to='/forgot'>Reset Password</Link>
              </div>
              <div class='col-6'>
                <h4>Lifetime Player Statistics:</h4>
                <p>Kills: {this.state.kills}</p>
                <p>Deaths: {this.state.deaths}</p>
                <p>Games Participated In: {this.state.games.length}</p>
                <p>Games Won: {0}</p>
              </div>
            </div>
            <div class='row justify-content-center'>
              <div class='col-6'>
                <h4>Previous Games</h4>
                {this.state.games ? <GameResults games={this.state.games} /> : 'No games found...'}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='AccountDetails'>
          <p>User not logged in. Inaccessible.</p>
        </div>
      )
    }
  }
}

export default AccountDisplay
