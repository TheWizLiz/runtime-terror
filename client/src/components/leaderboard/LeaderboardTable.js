import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Header from './Header.js'
import Body from './Body.js'
import Player from './Player.js'

class LeaderboardTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currGame: [],
      currResults: [],
      gameResults: [],
      lbLoaded: false
    }
  }

  componentDidMount () {
    fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/games/currLeaderboard')
      .then(res => res.json())
      .then(results => {
        if (results.success) {
          // console.log('Leaderboard results', results.leaderboard)
          this.setState({
            currGame: results.leaderboard
          })
        } else {}
      })
      .catch(err => console.log('Problem Loading Current Game Leaderboard', err))
  }

  componentDidUpdate () {
    if (!this.state.lbLoaded && this.state.currGame) {
      console.log('UPDATED LEADERBOARD')
      for (let i = 0; i < this.state.currGame.length; i++) {
        // console.log(this.state.currGame[i])
        this.state.currResults.push(<Player player={this.state.currGame[i]} rank={i + 1} />)
      }
      this.setState({
        lbLoaded: true
      })
    }
  }

  // HEADER: # | Player | Kills | Deaths | Team | Remaining Lives
  render () {
    if (this.state.lbLoaded) {
      return (
        <div className='container'>
          <div className='row'>
            <Table striped bordered hover id='leaderboard' variant='dark'>
              <Header />
              <tbody>
                {this.state.currResults}
              </tbody>
            </Table>
          </div>
        </div>
      )
    } else {
      return (
        <p>Not Loaded.</p>
      )
    }
  }
}

export default LeaderboardTable
