import React from 'react'

class LeaderboardSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <select className='form-select'>
        <option selected value='current'>Current Game</option>
        <option value='top5'>Top 5 All Time</option>
        <option value='1'>Game 1</option>
        <option value='2'>Game 2</option>
        <option value='3'>Game 3</option>
      </select>
    )
  }
}

export default LeaderboardSelector
