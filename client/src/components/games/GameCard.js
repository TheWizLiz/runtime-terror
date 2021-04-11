import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from "react-router-dom";

class GameCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { loading: true }
  }

  render () {
    return (
      <div className='gameCard'>
        <Card style={{ width: '22rem' }}>
          <Card.Img variant="top" src={this.props.filePath} />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle>Reg Countdown: {this.props.reg_days}:{this.props.reg_hrs}:{this.props.reg_min}:{this.props.reg_sec}</Card.Subtitle> <br />
            <Card.Subtitle>{this.props.location}</Card.Subtitle> <br />
            <Card.Subtitle>{this.props.start_date}--{this.props.end_date}</Card.Subtitle> <br />
            <Card.Subtitle>{this.props.start_time}--{this.props.end_time}</Card.Subtitle>
            <Card.Text>
              {this.props.desc}
            </Card.Text>
            <Link to='/registration'>
              <Button variant="primary">Register</Button>
            </Link>
          </Card.Body>
        </Card>
        <br />
      </div>
    )
  }
}

export default GameCard
