import React from 'react'
import { useState } from 'react';
import Table from 'react-bootstrap/Table'
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  

class PlayerEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      usernameToDelete: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    //e.preventDefault();
    fetch('http://localhost:5000/api/account/deleteAccount', {
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
          usernameToDelete: ''
        })
      }
      console.log('json', json)
    })
    .catch((err) => console.log('An error occured deleting the user', err))
  }
  

  render () {
    return (
      <tbody>
        <tr>
          <td>{this.props.player.username}</td>
          <td>{this.props.player.email}</td>
          <td>{this.props.player.acctType}</td>
          <td>
            <Button variant='outline-primary'>
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
