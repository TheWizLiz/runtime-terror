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

  componentDidMount () {
    fetch('http://localhost:5000/api/games/ongoingGame')
      .then(res => res.json())
      .then(results => {
        const game = results.game
        if (game) {
          const options = []
          options.push(<option value={game._id}>{game.game_title}</option>)

          this.setState({
            options: options,
            loaded: true
          })
        } else {
          console.log('Games...', game)
        }
      })
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
