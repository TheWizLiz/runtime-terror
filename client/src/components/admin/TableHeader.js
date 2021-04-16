import React from 'react'
//import Table from 'react-bootstrap/Table'

class TableHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      headers: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    for (let i = 0; i < this.props.tableHeaders.length; i++) {
      this.state.headers.push(<th>{this.props.tableHeaders[i]}</th>)
    }
    this.setState({ isLoaded: true })
  }

  render () {
    if (this.state.isLoaded) {
      return (
        <thead>
          <tr>
            {this.state.headers}
          </tr>
        </thead>
      )
    } else {
      return null
    }
  }
}

export default TableHeader
