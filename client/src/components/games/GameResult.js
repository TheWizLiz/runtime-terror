import React from 'react'

class GameResult extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        gameId: 0,
        gameTitle: '',
        player: '',
        kills: 0,
        deaths: 0,
        team:'Zombie',
        timeAlive: 0
      }
    }

    render () {
        return (
            <div class='Game-Result'>
                <p class='dropdown-item'>Game: {this.state.gameTitle}</p>
                <p class='dropdown-item'>Kills: {this.state.kills}</p>
                <p class='dropdown-item'>Deaths: {this.state.deaths}</p>
                <p class='dropdown-item'>Team: {this.state.team}</p>
                <p class='dropdown-item'>Time Alive: {this.state.timeAlive}</p>
            </div> 
            )
    }
}