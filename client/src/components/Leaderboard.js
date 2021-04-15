import React from "react";
import LeaderboardTable from '../components/leaderboard/LeaderboardTable.js'

function Leaderboard () {
  return (
    <div className="leaderboard">
      <div class="container">
        <div class="row align-items-center my-5">
          <h1 class="font-weight-light">Leaderboard</h1>
          <LeaderboardTable />
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
