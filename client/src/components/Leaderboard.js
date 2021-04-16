import React from "react"
import LeaderboardSelector from '../components/leaderboard/LeaderboardSelector.js'
import LeaderboardTable from '../components/leaderboard/LeaderboardTable.js'

function Leaderboard () {
  return (
    <div className="leaderboard">
      <div class="container">
        <div class="row align-items-center my-5">
          <h1 class="font-weight-light">Leaderboard</h1>
        </div>
        <div className='row align-items-center my-5'>
          <LeaderboardSelector />
        </div>
        <div className='row align-items-center my-5'>
          <LeaderboardTable />
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
