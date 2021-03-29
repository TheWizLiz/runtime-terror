import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'

class GameResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gameId: 0,
      gameTitle: 'GAME TITLE',
      player: '',
      kills: 0,
      deaths: 0,
      team: 'Zombie',
      timeAlive: 0
    }
  }


  /*
        <div class='Game-Result'>
        <p class='dropdown-item'>Game: {this.state.gameTitle}</p>
        <p class='dropdown-item'>Kills: {this.state.kills}</p>
        <p class='dropdown-item'>Deaths: {this.state.deaths}</p>
        <p class='dropdown-item'>Team: {this.state.team}</p>
        <p class='dropdown-item'>Time Alive: {this.state.timeAlive}</p>
      </div>
  */
  render () {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} variant='link' eventKey={this.props.gameNum}>
            {this.state.gameTitle}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.gameNum}>
          <Card.Body>
          Kills: {this.props.game.kills} <br />
          Deaths: {this.props.game.deaths} <br />
          Team: {this.props.game.team} <br />
          Time Alive: {this.props.game.timeOfDeath} <br />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}

export default GameResult
