import React from 'react'
//import Table from 'react-bootstrap/Table' 

class RegPlayerEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <tbody>
        <tr>
          <td>{this.props.gameEntries.game_id}</td>
          <td>{this.props.gameEntries.player_id}</td>
          <td>{this.props.gameEntries.blaster_id}</td>
          <td>{this.props.gameEntries.bandana_id}</td>
        </tr>
      </tbody>
    )
  }
}

export default RegPlayerEntry
