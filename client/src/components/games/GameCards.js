import React from 'react'
import GameCard from './GameCard.js'

class GameCards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const games = this.props.games
    const gameInfo = []
    for (let i = 0; i < games.length; i++) {
      console.log(Date.now() - games[i].registration_deadline)
      const startTime = games[i].time_start.substr((games[i].time_start.indexOf('T') + 1), games[i].time_start.indexOf('.'))
      const endTime = games[i].time_end.substr((games[i].time_end.indexOf('T') + 1), games[i].time_end.indexOf('.'))
      const regDays = Math.floor(Date.parse(games[i].registration_deadline) - Date.now()) / (1000 * 60 * 60 * 24)
      const regHours = (regDays - Math.floor(regDays)) * 24
      const regMin = (regHours - Math.floor(regHours)) * 60
      const regSec = (regMin - Math.floor(regMin)) * 60
      gameInfo.push(
        <GameCard
          title={games[i].game_title}
          desc= {games[i].description}
          location={games[i].location}
          current_game={games[i].current_game}
          start_date={games[i].time_start.substr(0, games[i].time_start.indexOf('T'))}
          end_date={games[i].time_end.substr(0, games[i].time_end.indexOf('T'))}
          start_time={startTime}
          end_time={endTime}
          reg_days={Math.floor(regDays) < 10 ? ('0' + Math.floor(regDays)).toString() : Math.floor(regDays)}
          reg_hrs={Math.floor(regHours) < 10 ? ('0' + Math.floor(regHours)).toString() : Math.floor(regHours)}
          reg_min={Math.floor(regMin) < 10 ? ('0' + Math.floor(regMin)).toString() : Math.floor(regMin)}
          reg_sec={Math.floor(regSec) < 10 ? ('0' + Math.floor(regSec)).toString() : Math.floor(regSec)}
          filePath={games[i].filePath}
        />)
    }

    return (
      <div class='game-results'>
        {gameInfo}
      </div>
    )
  }
}

export default GameCards
