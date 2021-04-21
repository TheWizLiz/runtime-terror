import React from 'react'

class EndGameDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
      loaded: false,
      currentVal: ''
    }
  }

  componentDidUpdate () {
    if (!this.state.loaded) {
      const game = this.props.game
      const values = []
      if (game) {
        values.push(<option name={game.game_title} value={game._id}>{game.game_title}</option>)
      }

      this.setState({
        options: values,
        loaded: true
      })
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className='container'>
          <div className='row'>
            <select id='end_game_selector' name='registered_games'>
              <option value=''>Select a game</option>
              {this.state.options}
            </select>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default EndGameDropdown
