import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

class GameResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gameId: 0,
      gameTitle: 'Game',
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
            {this.props.game.game_title}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.gameNum}>
          <Card.Body>
          Kills: {this.props.game.kills} <br />
          Deaths: {this.props.game.deaths} <br />
          Original Team: {this.props.game.original_team} <br />
          End Team: {this.props.game.end_team} <br />
          Placement: {this.props.game.placement} <br />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}

export default GameResult
