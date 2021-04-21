import React from 'react'

class PropertyDoc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.PropertyDoc.player_id}</td>
        <td>{this.props.PropertyDoc.blaster_id}</td>
        <td>{this.props.PropertyDoc.bandana_id}</td>
        <td>{this.props.PropertyDoc.notifications}</td>
      </tr>
    )
  }
}

export default PropertyDoc