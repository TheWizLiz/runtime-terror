import React from 'react'
import Card from 'react-bootstrap/Card'
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
