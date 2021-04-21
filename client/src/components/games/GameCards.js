import React from 'react'
import GameCard from './GameCard.js'

class GameCards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.formatTime = this.formatTime.bind(this)
  }

  formatTime (time) {
    const hours = +time.substring(0, time.indexOf(':'))
    const min = time.substring(time.indexOf(':'))
    console.log(hours)
    if (hours > 12) {
      const pmFix = '0' + ((hours - 12).toString())
      const time = pmFix + min + 'PM'
      return time
    } else {
      const amFix = time + 'AM'
      return amFix
    }
  }

  render () {
    const games = this.props.games
    const gameInfo = []
    if (games) {
      for (let i = 0; i < games.length; i++) {
        const stringStart = games[i].time_start.toString()
        const stringEnd = games[i].time_end.toString()
        const startTime = this.formatTime(stringStart.substr(11, 5))
        const endTime = this.formatTime(stringEnd.substr(11, 5))
        const regDays = Math.floor(Date.parse(games[i].registration_deadline) - Date.now()) / (1000 * 60 * 60 * 24)
        const regHours = (regDays - Math.floor(regDays)) * 24
        const regMin = (regHours - Math.floor(regHours)) * 60
        const regSec = (regMin - Math.floor(regMin)) * 60
        // console.log('START TIME', stringStart.substr(11, 8))
        gameInfo.push(
          <GameCard
            game_id={games[i].game_id}
            title={games[i].game_title}
            desc={games[i].description}
            location={games[i].location}
            current_game={games[i].current_game}
            start_date={stringStart.substr((stringStart.indexOf('-') + 1), 5)}
            end_date={stringEnd.substr((stringStart.indexOf('-') + 1), 5)}
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
        <div className='gameCards'>
          {gameInfo}
        </div>
      )
    } else {
      return (
        <div className='gameCards'>
          <h3>No upcoming games...</h3>
        </div>
      )
    }
  }
}

export default GameCards
