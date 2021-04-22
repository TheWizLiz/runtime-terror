import React from 'react'
//import Table from 'react-bootstrap/Table'
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';  

class PlayerEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleDelete () {
    //e.preventDefault();
    fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/account/deleteAccount', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          username: this.props.player.username
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {          
        this.setState({
          //Clear state after
        })
      }
      console.log('json', json)
    })
    .catch((err) => console.log('An error occured deleting the user', err))
  }

  handleUpdate () {
    console.log('here')
    //e.preventDefault();
    if (this.props.player.acctType ==='player') {
      // change player to admin
      
      fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/account/updatePlayerAcc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.props.player.username
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {          
        this.setState({
          //Clear state after
        })
      }
      console.log('json', json)
    })
    .catch((err) => console.log('An error occured updating player the account type', err))

    } else if (this.props.player.acctType === 'admin') {
      // change admin to player
      fetch('http://Runtimeterror-env.eba-mqm5grtu.us-east-2.elasticbeanstalk.com/api/account/updateAdminAcc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.props.player.username
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {          
        this.setState({
          //Clear state after
        })
      }
      console.log('json', json)
    })
    .catch((err) => console.log('An error occured updating the admin account type', err))

    }
  }

  render () {
    return (
      <tbody>
        <tr>
          <td>{this.props.player.username}</td>
          <td>{this.props.player.email}</td>
          <td>{this.props.player.acctType}</td>
          <td>
            <Button onClick={this.handleUpdate} variant='outline-primary'>
              <PencilSquare />
            </Button>
          </td>
          <td>
            <Button onClick={this.handleDelete} variant='outline-danger'>
              <Trash />
            </Button>
          </td>
        </tr>
      </tbody>
    )
  }
}

export default PlayerEntry
