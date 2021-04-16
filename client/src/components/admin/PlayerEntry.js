import React from 'react'
//import Table from 'react-bootstrap/Table'

class PlayerEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <tbody>
        <tr>
          <td>{this.props.player.username}</td>
          <td>{this.props.player.email}</td>
          <td>{this.props.player.acctType}</td>
          <td>Checkbox</td>
          <td>Checkbox</td>
        </tr>
      </tbody>
    )
  }
}

export default PlayerEntry
