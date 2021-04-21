import React from "react";
import Table from 'react-bootstrap/Table'
import RegPlayerEntry from './RegPlayerEntry.js'
import TableHeader from './TableHeader.js'

class RegisteredPlayers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gameEntries: [],
      gameLoaded: false,
      tableHeaders: ['Game', 'Player', 'Bandana ID', 'Blaster ID'],
      tableBody: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:5000/api/account/getRegisteredPlayers')
    .then(res => res.json())
    .then(json => {
      this.setState({
        gameEntries: json
      })
      console.log(this.state.gameEntries)
    })
    .catch((err) => console.log('Error has occured', err))
  }

  componentDidUpdate () {
    if (this.state.gameEntries && !this.state.gameLoaded) {
      for (let i = 0; i < this.state.gameEntries.length; i++) {
        this.state.tableBody.push(<RegPlayerEntry gameEntries={this.state.gameEntries[i]} />)
      }
      this.setState({ gameLoaded: true })
    } else {
      console.log('Did not add game players..')
    }
  }

  render () {
    if (this.state.gameLoaded) {
      return (
        <div className='adminDashboard'>
          <div class='container'>
            <div class='col-6'>
              <div class='row align-items-center my-5'>
                <Table striped bordered hover vairant='dark'>
                  <TableHeader tableHeaders={this.state.tableHeaders} />
                  {this.state.tableBody}
                </Table>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default RegisteredPlayers
