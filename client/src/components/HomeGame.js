import React from 'react'
import GameCards from '../components/games/GameCards.js'

class HomeGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      game: []
    }
  }

  componentDidMount () {
    fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/games/getGames')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            game: this.state.game.concat(json.games[0]),
            loaded: true
          })
        }
      })
      .catch(err => console.log('No games... Or an error has occurred: ', err))
  }

  render () {
    if (this.state.loaded) {
      return (
        <GameCards games={this.state.game} />
      )
    } else {
      return (
        null
      )
    }
  }
}

export default HomeGame
