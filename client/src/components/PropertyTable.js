import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import PropHeader from './PropHeader.js'
import PropertyDoc from './PropertyDoc.js'

class PropertyTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currProps: [],
      currResults: [],
      propResults: [],
      lbLoaded: false
    }
  }

  componentDidMount () {
    fetch('http://localhost:5000/api/games/currPropBoard')
      .then(res => res.json())
      .then(results => {
        if (results.success) {
          // console.log('Leaderboard results', results.leaderboard)
          this.setState({
            currProps: results.leaderboard
          })
        } else {}
      })
      .catch(err => console.log('Problem Loading Current Game Leaderboard', err))
  }

  componentDidUpdate () {
    if (!this.state.lbLoaded && this.state.currProps) {
      console.log('UPDATED PROPERTY BOARD')
      for (let i = 0; i < this.state.currProps.length; i++) {
        // console.log(this.state.currProps[i])
        this.state.currResults.push(<PropertyDoc PropertyDoc={this.state.currProps[i]} rank={i + 1} />)
      }
      this.setState({
        lbLoaded: true
      })
    }
  }

  // HEADER: # | Player | Blaster | Bandana | Notifications
  render () {
    if (this.state.lbLoaded) {
      return (
        <div className='container'>
          <div className='row'>
            <Table striped bordered hover id='leaderboard' variant='dark'>
              <PropHeader />
              <tbody>
                {this.state.currResults}
              </tbody>
            </Table>
          </div>
        </div>
      )
    } else {
      return (
        <p>Not Loaded.</p>
      )
    }
  }
}

export default PropertyTable