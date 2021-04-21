import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class Message extends Component {

  constructor (props) {
    super(props)
    this.state = {
      show: true
    }
  }

  render () {
    return (
      <Alert variant={this.props.type} show={this.state.show} onClose={() => this.setState({ show: false })} dismissible>
        {this.props.message}
      </Alert>
    )
  }
}

export default Message
