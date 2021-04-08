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
      gameEnd: null,
      gamePhoto: null,

      // Game Limits
      playerLimit: null,
      playerLives: null,
      hoardeLimit: null,
      blasterLimit: null,
      bandanaLimit: null,
      wristbandLimit: null,

      // Registration and Meeting Information
      regStartDate: null,
      regStartTime: null,

      // Formatted Dates
      regStart: null,
      regEnd: null,

      ruleMeetingDate: null,
      ruleMeetingTime: null,
      ruleMeetingEnd: null,
      ruleMeetingZoom: '',
      ruleMeetingLocation: '',

      // Questionable Inputs...
      requirePlayerID: null,
      zombieToHuman: -1,
      humanToZombie: -1
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
    // Call fetch function.
    // Set loading variable to false
  }

  render () {
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
              <Form.Control name='gameEnd' placeholder="Game End Time" type="time" value={this.state.gameEnd} />
              <Form.Control name='gameLocation' placeholder="Game Location" value={this.state.gameLocation} />
              <Form.Control name='gameDesc' as='textarea' placeholder='Game Description' value={this.state.gameDesc} />
              <Form.File name="gamePhoto" label="Game Image" value={this.state.gamePhoto} />
            </Form.Group>

            <Form.Group controlId="registrationInformation">
              <Form.Label>Registration Information</Form.Label>
              <Form.Control name='regStartDate' type="date" placeholder="Registration Release Date" value={this.state.regStartDate} />
              <Form.Control name='regStartTime' type="time" placeholder="Registration Release Time" /> <br />
              <Form.Label>Registration End Date</Form.Label>
              <Form.Control name='regEnd' type='date' placeholder='Registration End Date' value={this.state.regEnd} />
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
              <Form.Control name='OGHoardeLimit' placeholder="Number of Particpants Allowed to Select Team Preference" value={this.HoardeLimit} />
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
  }
}

export default GameCreation
