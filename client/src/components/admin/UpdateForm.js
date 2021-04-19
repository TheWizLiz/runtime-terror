import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Game_Logo from './../../images/gameLogo.png';

class UpdateForm extends React.Component {
    render() {
      return (
        <div class="updateForm">
          <Form>
          <Form.Group controlId="gameInformation">
            <div class="row">
                <div class="col">
                    <Form.Label>Game Title</Form.Label>
                    <Form.Control placeholder="Current Title" />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder=" Current Date" />
                </div>
                <div class="col">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" placeholder="Current Time" />
                </div>
            </div>
            <div class="row">
                <div class = "col">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" placeholder="Current Description" />
                </div>
                <div class = "col">
                    <div class = "row">
                    <Form.Label>Image Preview</Form.Label>
                    </div>
                    <div class = "row">
                    <Figure>
                        <Figure.Image
                            width={130}
                            height={130}
                            src={Game_Logo}
                            alt = "Game_Logo"
                        />
                    </Figure>
                    </div>
                    <div class = "row">
                    <Form.Control type = "file" placeholder="Image Upload Box" />
                    </div>
                </div>
            </div>
            <div class = "row">
                <div class = "col">
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Current Location" />
                </div>
            </div>
            <div class = "row">
                <div class = "col">
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Add Bounties" />
                    </Form.Group>
                </div>
                <div class = "col">
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remove Bounties" />
                    </Form.Group>
                </div>
                <div class = "col">
                <Form.Label>Registration Limit</Form.Label>
                    <Form.Control placeholder="Current Limit" />
                </div>
            </div>
            <div class = "row">
                <div class = "col">
                    <Form.Label>Add Attribute</Form.Label>
                    <Form.Control placeholder="{Attribute Name : Data Type}" />
                </div>
            </div>
            <br/>
            <Button variant="primary" type="submit">
                Update
            </Button>

            </Form.Group>
          </Form>
        </div>
      )
    }
  }
  
  export default UpdateForm;
