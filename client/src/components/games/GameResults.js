import React from 'react'
import GameResult from './GameResult.js'
import Accordion from 'react-bootstrap/Accordion'

// Add Placement Attribute Later..?
//         <p class='dropdown-item'>Placement: {this.state.placement}</p>

class GameResults extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const games = this.props.games
    const gameResults = []

    for (let i = 0; i < games.length; i++) {
      gameResults.push(<GameResult gameNum={i + 1} game={games[i]} />)
    }

    return (
      <div class='game-results'>
        <Accordion>
          {gameResults}
        </Accordion>
      </div>
    )
  }
}

export default GameResults
