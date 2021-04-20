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

  componentDidMount () {
    fetch('http://localhost:5000/api/games/currentGames')
      .then(res => res.json())
      .then(results => {
        const games = results.games
        if (games && games.length > 0) {
          const options = []
          // console.log('Games', games)

          for (let i = 0; i < games.length; i++) {
            options.push(<option value={games[i]._id}>{games[i].game_title}</option>)
          }
          this.setState({
            options: options,
            loaded: true
          })
        } else {
          console.log('Games...', games)
        }
      })
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
