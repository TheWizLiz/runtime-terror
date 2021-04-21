import React from 'react'

class Player extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.player.player_id}</td>
        <td>{this.props.player.kills}</td>
        <td>{this.props.player.deaths}</td>
        <td>{this.props.player.original_team}</td>
        <td>{this.props.player.remaining_lives}</td>
      </tr>
    )
  }
}

export default Player
