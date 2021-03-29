import React from "react";
import Table from 'react-bootstrap/Table'
import PlayerEntry from './PlayerEntry.js'
import TableHeader from './TableHeader.js'

class AccManager extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      players: [],
      playersLoaded: false,
      tableHeaders: ['Player', 'Email', 'Account Type', 'Update', 'Delete'],
      tableBody: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:5000/api/account/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          players: json,
        })
        console.log(this.state.players)
      })
      .catch((err) => console.log('Error has occured', err))
  }

  componentDidUpdate () {
    if (this.state.players && !this.state.playersLoaded) {
      for (let i = 0; i < this.state.players.length; i++) {
        this.state.tableBody.push(<PlayerEntry player={this.state.players[i]} />)
      }
      this.setState({ playersLoaded: true })
    } else {
      console.log('Did not add players..')
    }
  }

  render () {
    if (this.state.playersLoaded) {
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

export default AccManager
