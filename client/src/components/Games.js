import React from "react";
import GameCard from './games/GameCard.js'
import GameCards from './games/GameCards.js'

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/games/getGames')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            games: json.games
          })
        }
      })
      .catch(err => console.log('No games... Or an error has occurred: ', err))
  }


  render () {
    return (
      <div className="games">
          <div class="container">
              <div class="row align-items-center my-5">
                  <h1 class="font-weight-light">Games</h1>
              </div>
              <div class="row align-items-center my-5">
                  <GameCards games={this.state.games} />
              </div>
          </div>
      </div>
    );
  }
  
}

export default Games;