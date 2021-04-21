import React from 'react'

class CurrentGameDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      games: [],
      options: [],
      loaded: false,
      currentVal: ''
    }
  }

  componentDidUpdate () {
    if (this.state.loaded === false) {
      const games = this.props.games
      const values = []
      if (games.length > 0) {
        for (let i = 0; i < games.length; i++) {
          values.push(<option name={games[i].game_title} value={games[i]._id}>{games[i].game_title}</option>)
        }
        this.setState({
          options: values,
          loaded: true
        })
      }
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className='container'>
          <div className='row'>
            <select id='start_game_selector' name='registered_games'>
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

export default CurrentGameDropdown
