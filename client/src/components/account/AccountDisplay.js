import React from 'react'
import { getFromStorage } from '../utils/storage.js'
import LogoutButton from './LogoutButton'

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
      kills: 0,
      deaths: 0,
      team: '',
      game: 1
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
      Promise.all([
        fetch('http://localhost:5000/api/account/getAcct/?acct=' + token).then(res => res.json()),
        fetch('http://localhost:5000/api/games/getStats/?user=' + 'example' + '&game=' + this.state.game).then(res => res.json())
      ]).then(([account, game]) =>
        this.setState({
          username: account.username,
          email: account.email,
          acctType: account.acctType,
          createdAt: account.createdAt,
          playerLoaded: true,
          kills: game[0].kills,
          deaths: game[0].deaths,
          team: game[0].team
        })
      ).catch((err) => console.log('An error Occured Loading the Player or Game Data', err))
    }
  }

  render () {
    return (
      <div className='AccountDetails'>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <p>Account Type: {this.state.acctType}</p>
        <p>Created At: {this.state.createdAt}</p>
        <p>Kills: {this.state.kills}</p>
        <p>Deaths: {this.state.deaths}</p>
        <p>Team: {this.state.team}</p>
      </div>
    )
  }
}

export default AccountDisplay
