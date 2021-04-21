import React from "react";
import Form from "react-bootstrap/Form";
import { getFromStorage } from './utils/storage.js'
import Button from "react-bootstrap/Button";
import axios from 'axios'
import Message from './Message.js'

class GameCreation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // Loading for state
      loading: true,
      message: '',
      msgType: '',
      isAdmin: false,
      adminLoaded: false,

      // Basic Game Information
      gameTitle: '',
      gameDate: '',
      gameTime: '',
      gameDesc: '',
      gameLocation: '',

      gameEndTime: '',
      gameEndDate: '',
      gamePhoto: '',
      gamePhotoName: '',
      gamePhotoUploaded: {},

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
    this.handleImage = this.handleImage.bind(this)
    this.handleImageSubmit = this.handleImageSubmit.bind(this)
    this.validateAdmin = this.validateAdmin.bind(this)
  }

  handleImage (e) {
    console.log(e.target.files)
    this.setState({
      gamePhoto: e.target.files[0],
      gamePhotoName: e.target.files[0].name
    })
  }

  async handleImageSubmit (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', this.state.gamePhoto)
    console.log('ABOUT TO UPLOAD')

    await axios.post('http://localhost:5000/api/games/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        if (!res.data.success) {
          this.setState({
            message: 'No file uploaded.',
            msgType: 'danger'
          })
        } else {
          console.log('resDATA', res)
          const { fileName, filePath } = res.data
          this.setState({
            gamePhotoUploaded: { fileName, filePath },
            message: 'File Uploaded.',
            msgType: 'success'
          })
        }
      })
      .catch(err => {
        console.log('An error has occurred when trying to upload file: ', err)
        this.setState({
          message: 'Error Uploading File.',
          msgType: 'warning'
        })
      })
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    let regStart = ''
    let regEnd = ''
    console.log('Game Time', this.state.gameTime)
    console.log('Game Date', this.state.gameDate)
    // Format date
    const gameDateFormatted = this.state.gameDate + 'T' + this.state.gameTime + ':00'
    const gameEnd = this.state.gameEndDate + 'T' + this.state.gameEndTime + ':00'

    // If Registration Date not filled, will start the registration now.
    if (!this.state.regStartDate) {
      regStart = Date.now().toString()
    } else {
      regStart = this.state.regStartDate + 'T' + this.state.regStartTime + ':00'
    }

    console.log('Date.now', Date.now())
    console.log(gameDateFormatted)
    regEnd = this.state.regEndDate + 'T' + this.state.regEndTime + ':00'
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
        gamePhoto: this.state.gamePhotoUploaded,
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
          loading: false,
          gamePhotoUploaded: game.photo
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount () {
    const storage = getFromStorage('the_main_app')
    // console.log(token)
    if (storage && storage.token) {
      const { token } = storage
      fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
        .then(res => res.json())
        .then(player => this.validateAdmin(player))
        .catch((err) => console.log('An error Occured Loading the Player Data', err))
    }
  }

  // componentDidUpdate () {

  // }

  validateAdmin (player) {
    if (player.acctType === 'admin') {
      this.setState({
        adminLoaded: true,
        isAdmin: true
      })
    } else {
      this.setState({
        isAdmin: false,
        adminLoaded: true
      })
    }
  }

  render () {
    if (this.state.loading && this.state.isAdmin && this.state.adminLoaded) {
      return (
        <div className="GameCreation">
          <div className="container mt-5 mb-5">
            <h1 className="font-weight-light">Create a Game</h1>
            <Form onSubmit={this.handleSubmit}>
              <div className='row'>
                <div className='col-6'>
                  <Form.Group onChange={this.handleInputChange} controlId="gameInformation">
                    <Form.Label>Game Information</Form.Label>
                    <Form.Control name='gameTitle' placeholder="Game Title" value={this.state.gameTitle} />
                    <Form.Label>Game Start Time</Form.Label>
                    <Form.Control name='gameDate' placeholder="Game Date" type="date" value={this.state.gameDate} />
                    <Form.Control name='gameTime' placeholder="Game Time" type="time" value={this.state.gameTime} />
                    <Form.Label>Game End Time</Form.Label>
                    <Form.Control name='gameEndDate' placeholder="Game End Time" type="date" value={this.state.gameEndDate} />
                    <Form.Control name='gameEndTime' placeholder="Game End Time" type="time" value={this.state.gameEndTime} />
                    <Form.Label>Location and Description</Form.Label>
                    <Form.Control name='gameLocation' placeholder="Game Location" value={this.state.gameLocation} />
                    <Form.Control name='gameDesc' as='textarea' placeholder='Game Description' value={this.state.gameDesc} />
                  </Form.Group>

                  <Form.Group onChange={this.handleInputChange} controlId="registrationInformation">
                    <Form.Label>Registration Start Date</Form.Label>
                    <Form.Control name='regStartDate' type="date" placeholder="Registration Release Date" value={this.state.regStartDate} />
                    <Form.Control name='regStartTime' type="time" placeholder="Registration Release Time" value={this.state.regStartTime} />
                    <Form.Label>Registration End Date</Form.Label>
                    <Form.Control name='regEndDate' type='date' placeholder='Registration End Date' value={this.state.regEndDate} />
                    <Form.Control name='regEndTime' type='time' placeholder='Registration End Date' value={this.state.regEndTime} />
                  </Form.Group>
                </div>
                <div className='col-6'>
                  <Form.Group onChange={this.handleInputChange} controlId="rulesMeetingInfo">
                    <Form.Label>Rules Meeting Information</Form.Label>
                    <Form.Control name='ruleMeetingDate' type="date" placeholder="Date" value={this.state.ruleMeetingDate} />
                    <Form.Control name='ruleMeetingTime' type="time" placeholder="Time Start" value={this.state.ruleMeetingTime} />
                    <Form.Control name='ruleMeetingZoom' placeholder="Location/Zoom Link" value={this.state.ruleMeetingZoom} /> <br />
                    <Form.Label>Rules Meeting End Time</Form.Label>
                    <Form.Control name='ruleMeetingEnd' type="time" placeholder="Time End" value={this.state.ruleMeetingEnd} />
                  </Form.Group>

                  <Form.Group onChange={this.handleInputChange} controlId="gameLogistics">
                    <Form.Label>Game Logistics</Form.Label>
                    <Form.Control name='playerLimit' placeholder="Maximum Number of Participants" value={this.state.playerLimit} />
                    <Form.Control name='hoardeLimit' placeholder="Number of Particpants Allowed to Select Original Hoarde" value={this.state.hoardeLimit} />
                    <Form.Control name='playerLives' placeholder="Player Lives" value={this.state.playerLives} />
                  </Form.Group>

                  <Form.Group onChange={this.handleInputChange} controlId="gameProperties">
                    <Form.Label>Game Properties</Form.Label>
                    <Form.Control name='blasterLimit' placeholder="Number of Bandanas" value={this.state.blasterLimit} />
                    <Form.Control name='bandanaLimit' placeholder="Number of Blasters" value={this.state.bandanaLimit} />
                    <Form.Control name='wristbandLimit' placeholder="Number of Wristbands" value={this.state.wristbandLimit} />
                  </Form.Group>
                  <Button type='submit' variant="success">Create Game</Button>{' '}
                </div>
              </div>
            </Form>

            <Form onSubmit={this.handleImageSubmit} onChange={this.handleImage}>
              <Form.Group controlId='imageUpload'>
                <Form.File name="gamePhoto" label="Game Image" />
              </Form.Group>
              <Button type='submit' variant="primary">Upload Image</Button>{' '}
            </Form>

            {this.state.message ? <Message message={this.state.message} type={this.state.msgType} /> : null}
            {this.state.gamePhotoUploaded ?
              <div className='row'>
                <div className='col-6 m-auto'>
                  <h3>{this.state.gamePhotoUploaded.fileName}</h3>
                  <img style={{ width: '50%' }} src={this.state.gamePhotoUploaded.filePath} />
                </div>
              </div>
              : null}
          </div>
        </div>
      )
    } else if (!this.state.loading && this.state.isAdmin) {
      return (
        <div className='gameConfirm mt-5'>
          <h1>Game Added to Database.</h1>
          <button onClick={window.location.reload()}>Create New Game</button>
        </div>
      )
    } else {
      return (
        <div className='gameConfirm mt-5'>
          <h1>Restricted Page. Admin Only.</h1>
        </div>
      )
    }
  }
}

export default GameCreation
