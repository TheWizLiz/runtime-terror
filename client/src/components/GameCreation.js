import React from "react";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";

class GameCreation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // Loading for state
      loading: true,

      // Basic Game Information
      gameTitle: '',
      gameDate: '',
      gameTime: '',
      gameDesc: '',
      gameLocation: '',

      gameEndTime: '',
      gameEndDate: '',
      gamePhoto: '',

      // Game Limits
      playerLimit: '',
      playerLives: '',
      hoardeLimit: '',
      blasterLimit: '',
      bandanaLimit: '',
      wristbandLimit: '',

      // Registration and Meeting Information
      regStartDate: '',
      regStartTime: '',
      regEndDate: '',
      regEndTime: '',

      ruleMeetingDate: '',
      ruleMeetingTime: '',
      ruleMeetingEnd: '',
      ruleMeetingZoom: '',
      ruleMeetingLocation: '',

      // Questionable Inputs...
      requirePlayerID: '',
      zombieToHuman: '',
      humanToZombie: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log('Game Time', this.state.gameTime)
    console.log('Game Date', this.state.gameDate)
    // Format date
    const gameDateFormatted = this.state.gameDate + 'T' + this.state.gameTime + ':00'
    const gameEnd = this.state.gameEndDate + 'T' + this.state.gameEndTime + ':00'

    const regStart = this.state.regStartDate + 'T' + this.state.regStartTime + ':00'
    console.log(gameDateFormatted)
    const regEnd = this.state.regEndDate + 'T' + this.state.regEndTime + ':00'
    // Call fetch function.
    fetch('http://localhost:5000/api/games/createGame', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameTitle: this.state.gameTitle,
        gameDate: gameDateFormatted,
        gameEnd: gameEnd,

        gameDesc: this.state.gameDesc,
        gameLocation: this.state.gameLocation,
        gamePhoto: this.state.gamePhoto,
        regStart: regStart,
        regEnd: regEnd,

        playerLimit: this.state.playerLimit,
        playerLives: this.state.playerLives,
        hoardeLimit: this.state.hoardeLimit,
        blasterLimit: this.state.blasterLimit,
        bandanaLimit: this.state.bandanaLimit,
        wristbandLimit: this.state.wristbandLimit
      })
    })
    .then(res => res.json())
    .then(game => {
      console.log(game)
      this.setState({
        loading: false
      })
    })
    .catch(err => console.log(err))
    // Set loading variable to false
  }

  render () {
    if (this.state.loading) {
      return (
        <div className="GameCreation">
          <div className="container">
            <h1 className="font-weight-light">Create a Game</h1>
            <br />
            <Form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
              <Form.Group controlId="gameInformation">
                <Form.Label>Game Information</Form.Label>
                <Form.Control name='gameTitle' placeholder="Game Title" value={this.state.gameTitle} />
                <Form.Control name='gameDate' placeholder="Game Date" type="date" value={this.state.gameDate} />
                <Form.Control name='gameTime' placeholder="Game Time" type="time" value={this.state.gameTime} />
                <Form.Label>Game End Date</Form.Label>
                <Form.Control name='gameEndDate' placeholder="Game End Time" type="date" value={this.state.gameEndDate} />
                <Form.Control name='gameEndTime' placeholder="Game End Time" type="time" value={this.state.gameEndTime} />
                <Form.Label>Location and Description</Form.Label>
                <Form.Control name='gameLocation' placeholder="Game Location" value={this.state.gameLocation} />
                <Form.Control name='gameDesc' as='textarea' placeholder='Game Description' value={this.state.gameDesc} />
                <Form.File name="gamePhoto" label="Game Image" value={this.state.gamePhoto} />
              </Form.Group>
  
              <Form.Group controlId="registrationInformation">
                <Form.Label>Registration Information</Form.Label>
                <Form.Control name='regStartDate' type="date" placeholder="Registration Release Date" value={this.state.regStartDate} />
                <Form.Control name='regStartTime' type="time" placeholder="Registration Release Time" /> <br />
                <Form.Label>Registration End Date</Form.Label>
                <Form.Control name='regEndDate' type='date' placeholder='Registration End Date' value={this.state.regEndDate} />
                <Form.Control name='regEndTime' type='time' placeholder='Registration End Date' value={this.state.regEndTime} />
              </Form.Group>
  
              <Form.Group controlId="rulesMeetingInfo">
                <Form.Label>Rules Meeting Information</Form.Label>
                <Form.Control name='ruleMeetingDate' type="date" placeholder="Date" value={this.state.ruleMeetingDate} />
                <Form.Control name='ruleMeetingTime' type="time" placeholder="Time Start" value={this.state.ruleMeetingTime} />
                <Form.Control name='ruleMeetingZoom' placeholder="Location/Zoom Link" value={this.state.ruleMeetingZoom} /> <br />
                <Form.Label>Rules Meeting End Time</Form.Label>
                <Form.Control name='ruleMeetingEnd' type="time" placeholder="Time End" value={this.state.ruleMeetingEnd} />
              </Form.Group>
  
              <Form.Group controlId="gameLogistics">
                <Form.Label>Game Logistics</Form.Label>
                <Form.Control name='playerLimit' placeholder="Maximum Number of Participants" value={this.state.playerLimit} />
                <Form.Control name='hoardeLimit' placeholder="Number of Particpants Allowed to Select Hoarde" value={this.state.hoardeLimit} />
                <Form.Control name='playerLives' placeholder="Player Lives" value={this.state.playerLives} />
              </Form.Group>
  
              <Form.Group controlId="gameProperties">
                <Form.Label>Game Properties</Form.Label>
                <Form.Control name='blasterLimit' placeholder="Number of Bandanas" value={this.state.blasterLimit} />
                <Form.Control name='bandanaLimit' placeholder="Number of Blasters" value={this.state.bandanaLimit} />
                <Form.Control name='wristbandLimit' placeholder="Number of Wristbands" value={this.state.wristbandLimit} />
              </Form.Group>
              {/*
              <Form.Group controlId="gameAttibutes">
                <Form.Label>Game Attributes</Form.Label>
                <Form.Control placeholder="Attribute Name" />
                <Form.Control placeholder="Attribute Datatype" />
                <Form.Control placeholder="Reward Name" />
                <Form.Control placeholder="Reward Datatype" />
              </Form.Group>
  
              <p>Require player ID?</p>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton value={1}>Opponent</ToggleButton>
                <ToggleButton value={2}>Team Member</ToggleButton>
                <ToggleButton value={3}>Both</ToggleButton>
                <ToggleButton value={4}>Neither</ToggleButton>
              </ToggleButtonGroup>
  
              <br/>
              <br/>
  
              <p>Require player ID?</p>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton value={1}>Yes</ToggleButton>
                <ToggleButton value={2}>No</ToggleButton>
              </ToggleButtonGroup>
  
              <br/>
              <br/>
  
              <Form.Group controlId="instances">
                <Form.Label>How many instances until a human switches to zombie?</Form.Label>
                <Form.Control placeholder="Enter here..." />
                <Form.Label>How many instances until a zombie switches to human?</Form.Label>
                <Form.Control placeholder="Enter here..." />
              </Form.Group>
              */}
              <Button type='submit' variant="primary">Create Game</Button>{' '}
  
            </Form>
  
          </div>
        </div>
      )
    } else {
      return (<div className='gameConfirm'><p>Game Added to Database.</p></div>)
    }
    
  }
}

export default GameCreation
