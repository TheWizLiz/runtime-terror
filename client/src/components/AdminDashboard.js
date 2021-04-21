import React from "react";
import AccManager from './admin/AccManager.js'
import RegisteredPlayers from './admin/RegisteredPlayers.js'
import UpdateGameManager from './admin/UpdateGameManager.js'
import { getFromStorage } from './utils/storage.js'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CurrentGameDropdown from './CurrentGameDropdown.js'
import EndGameDropdown from './EndGameDropdown.js'

class AdminDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      acctType: '',
      isAdmin: false,
      adminLoaded: false,
      gameTitles: [],
      ongoingGame: '',
      gamesCanStart: [],
      viewUpdate: false,
      viewRegPlayers: false,
      viewAccounts: false,
      manageButton: 'Manage'
    }
    this.validateAdmin = this.validateAdmin.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)

    this.handleDisplayUpdate = this.handleDisplayUpdate.bind(this)
    this.handleRemoveUpdate = this.handleRemoveUpdate.bind(this)

    this.handleDisplayRegPlayers = this.handleDisplayRegPlayers.bind(this)
    this.handleRemoveRegPlayers = this.handleRemoveRegPlayers.bind(this)

    this.handleDisplayAccounts = this.handleDisplayAccounts.bind(this)
   //this.handleRemoveAccounts = this.handleRemoveAccounts.bind(this)
  }

  async componentDidMount () {
    const storage = getFromStorage('the_main_app')
    // console.log(token)
    if (storage && storage.token) {
      const { token } = storage
      await fetch('http://localhost:5000/api/account/getAcct/?acct=' + token)
        .then(res => res.json())
        .then(player => this.validateAdmin(player))
        .catch((err) => console.log('An error Occured Loading the Player Data', err))
    }

    await fetch('http://localhost:5000/api/games/currentGames')
      .then(res => res.json())
      .then(results => {
        const games = results.games
        const current_game = results.current_game
        console.log('GAMES', games)
        console.log('CURRENT_GAME', current_game)
        if (games && games.length > 0 && current_game) {
          console.log('games && games.length > 0 && current_game')
          this.setState({
            gamesCanStart: games,
            ongoingGame: current_game
          })
        } else if ((!games || games.length === 0) && current_game) {
          console.log('(!games || games.length === 0) && current_game')
          this.setState({
            ongoingGame: current_game
          })
        } else if (games && games.length > 0 && !current_game) {
          console.log('games && games.length > 0 && !current_game')
          this.setState({
            gamesCanStart: games
          })
        }
      })
      .catch(err => console.log('Big error with api/games/currentGames', err))

  }

  validateAdmin (player) {
    if (player.acctType === 'admin') {
      this.setState({
        username: player.username,
        email: player.email,
        acctType: player.acctType,
        createdAt: player.createdAt,
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

  handleStart () {
    const game_id = document.getElementById('start_game_selector').value

    console.log(game_id)
    if (game_id) {
      fetch('http://localhost:5000/api/games/gameStartTransfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: game_id
        })
      })
        .then(res => res.json())
        .then(game => console.log('Worked...?', game))
    } else {
      alert('No game selected.')
    }
  }

  handleEnd () {
    const game_id = document.getElementById('end_game_selector').value
    // Should change \/ \/
    const winner = 'Zombie'

    if (game_id) {
      fetch('http://localhost:5000/api/games/gameEndTransfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: game_id,
          winner: winner
        })
      })
        .then(res => res.json())
        .then(game => console.log('Worked...?', game))
    } else {
      alert('No game selected.')
    }
  }

  handleDisplayUpdate() {
    this.setState({
      viewUpdate: true
    })
  }

  handleRemoveUpdate() {
    this.setState({
      viewUpdate: false
    })
  }

  handleDisplayRegPlayers() {
    this.setState({
      viewRegPlayers: true
    })
  }

  handleRemoveRegPlayers() {
    this.setState({
      viewRegPlayers: false
    })
  }

  handleDisplayAccounts() {
    if (this.state.viewAccounts) {
      this.setState({
        manageButton: 'Manage',
        viewAccounts: false
      })
    } else {
      this.setState({
        manageButton: 'Close',
        viewAccounts: true
      })
    }
  }

  handleRemoveAccounts() {
    this.setState({
      viewAccounts: false
    })
  }

  render () {
    if (this.state.isAdmin && this.state.adminLoaded) {
      const viewUpdate = this.state.viewUpdate;
      const viewRegPlayers = this.state.viewRegPlayers;
      const viewAccounts = this.state.viewAccounts;
      const manageButton = this.state.manageButton;
      return (
        <div className='adminDashboard mb-5'>
          <div class='container'>
            <div class='row align-items-center my-5'>
              <h1 class='font-weight-light'>Admin Dashboard</h1>
            </div>
            <div class = "row justify-content-around">
              <div class="row justify-content-start">
                <div class = "col-3">
                  <Card style={{ width: '30rem' }}>
                    <Card.Body>
                      <Card.Title>Create a New Game</Card.Title>
                      <Button variant="primary" type="submit" href="/game-creation">
                        Create
                      </Button>
                    </Card.Body>
                  </Card><br/>

                  <Card style={{ width: '30rem' }}>
                    <Card.Body>
                      <Card.Title>Update Game</Card.Title>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">Select Game</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={this.handleRemoveUpdate}>None</Dropdown.Item>
                          <Dropdown.Item onClick={this.handleDisplayUpdate}>Current Game Title</Dropdown.Item>
                          <Dropdown.Item onClick={this.handleDisplayUpdate}>Next Game Title</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      {viewUpdate && <UpdateGameManager />}
                    </Card.Body>
                  </Card>

                  <div className='row'>
                    <h4>Start Game (TESTING)</h4>
                    <CurrentGameDropdown games={this.state.gamesCanStart} />
                    <Button variant="success" onClick={this.handleStart}>Start</Button>
                  </div>
                  <div className='row'>
                    <h4>End Game (TESTING)</h4>
                    <EndGameDropdown game={this.state.ongoingGame} />
                    <Button variant="danger" onClick={this.handleEnd}>End</Button>
                  </div>
                </div>
              </div>  
              <div class="row justify-content-start">
                <div class="col-4">
                  <Card style={{width: '40rem'}}>
                    <Card.Body>
                      <Card.Title>Manage Accounts</Card.Title>
                      <Button variant="primary" onClick={this.handleDisplayAccounts}>{manageButton}</Button>
                      {viewAccounts && <AccManager />}
                    </Card.Body>
                  </Card><br/>

                  <Card style={{ width: '40rem' }}>
                    <Card.Body>
                     <Card.Title>View Registered Players for a Game</Card.Title>
                      <Dropdown>
                       <Dropdown.Toggle variant="primary" id="dropdown-basic">Select Game</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={this.handleRemoveRegPlayers}>None</Dropdown.Item>
                          <Dropdown.Item onClick={this.handleDisplayRegPlayers}>Current Game Title</Dropdown.Item>
                          <Dropdown.Item onClick={this.handleDisplayRegPlayers}>Next Game Title</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      {viewRegPlayers && <RegisteredPlayers />}
                    </Card.Body>
                  </Card><br/>
                </div>
              </div>
            </div>
            </div>
          </div>
      )
    } else {
      return (
        <div className='adminDashboard'>
          <div class='container'>
            <div class='row align-items-center my-5'>
              <h1 class='font-weight-light'>Not an admin. Restricted.</h1>
            </div>
          </div>
        </div>
      )
    }
    
  }
}

export default AdminDashboard
