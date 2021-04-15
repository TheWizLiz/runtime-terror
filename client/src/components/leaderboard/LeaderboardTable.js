import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

class LeaderboardTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <Table id='leaderboard' variant='dark'>
            <thead>
              <th>#</th>
              <th>Player</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Team</th>
              <th>Remaining Lives</th>
            </thead>
          </Table>
        </div>
      </div>
    )
  }
}

export default LeaderboardTable
