import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from "react-router-dom";

class GameCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      link: '/registration/'
    }
  }

  componentDidMount () {
    this.setState({
      link: this.state.link + this.props.game_id,
      loading: false
    })
  }

  render () {
    if (!this.state.loading) {
      return (
        <div className='gameCard'>
          <Card style={{ width: '22rem' }}>
            <Card.Img variant='top' src={this.props.filePath} />
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Subtitle>Registration Ends: {this.props.reg_days}:{this.props.reg_hrs}:{this.props.reg_min}:{this.props.reg_sec}</Card.Subtitle> <br />
              <Card.Subtitle>
                <Card.Img style={{ width: '8%', 'padding-right': '5px' }} src='/images/content/location-icon.png' />
                {this.props.location}
              </Card.Subtitle> <br />
              <Card.Subtitle>{this.props.start_date} at {this.props.start_time} -- {this.props.end_date} at {this.props.end_time}</Card.Subtitle> <br />
              <Card.Text>
                {this.props.desc}
              </Card.Text>
              <Link to={this.state.link}>
                <Button variant="primary">Register</Button>
              </Link>
            </Card.Body>
          </Card>
          <br />
        </div>
      )
    } else {
      return null
    }
  }
}

export default GameCard
